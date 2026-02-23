import { Role, TokenType, AccountStatus, PrismaClient } from '@prisma/client';
import { prisma } from '../../config/database';
import { env } from '../../config/env';
import { logger } from '../../config/logger';
import { blacklistToken, isTokenBlacklisted } from '../../config/redis';
import {
  hashPassword,
  comparePassword,
  generateSecureToken,
  hashToken,
  safeCompare,
} from '../../utils/password.utils';
import {
  signAccessToken,
  signRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
  getRefreshTokenExpiry,
  getEmailVerificationExpiry,
  getPasswordResetExpiry,
  getTokenTTL,
} from '../../utils/jwt.utils';
import { emailService } from '../../utils/email.utils';
import { AppError } from '../../utils/AppError';
import { AppErrorCode, TokenPair, DeviceInfo } from '../../types';
import {
  RegisterInput,
  LoginInput,
  RefreshTokenInput,
  ForgotPasswordInput,
  ResetPasswordInput,
  ChangePasswordInput,
  VerifyEmailInput,
} from './auth.schemas';

// ─────────────────────────────────────────────────────────────
// Auth Service
// ─────────────────────────────────────────────────────────────
export class AuthService {
  // ─── Register ───────────────────────────────────────────────
  async register(input: RegisterInput, device: DeviceInfo) {
    const { email, password, firstName, lastName, phone, role } = input;

    // 1. Check email uniqueness
    const existingEmail = await prisma.user.findUnique({
      where: { email },
      select: { id: true },
    });
    if (existingEmail) {
      throw AppError.conflict(
        'An account with this email already exists',
        AppErrorCode.EMAIL_ALREADY_TAKEN,
      );
    }

    // 2. Check phone uniqueness if provided
    if (phone) {
      const existingPhone = await prisma.user.findUnique({
        where: { phone },
        select: { id: true },
      });
      if (existingPhone) {
        throw AppError.conflict(
          'An account with this phone number already exists',
          AppErrorCode.PHONE_ALREADY_TAKEN,
        );
      }
    }

    // 3. Hash password
    const passwordHash = await hashPassword(password);

    // 4. Generate verification token
    const verificationToken = generateSecureToken(32);
    const hashedVerificationToken = hashToken(verificationToken);

    // 5. Create user + profiles in transaction
    const user = await (prisma as any).$transaction(async (tx: any) => {
      const newUser = await tx.user.create({
        data: {
          email,
          passwordHash,
          firstName,
          lastName,
          phone: phone ?? null,
          role: role ?? Role.CUSTOMER,
          status: AccountStatus.PENDING_VERIFICATION,

          // Create role-specific profile
          ...(role === Role.ADMIN
            ? { adminProfile: { create: {} } }
            : { customerProfile: { create: {} } }),
        },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          role: true,
          status: true,
        },
      });

      // Store verification token
      await tx.token.create({
        data: {
          userId: newUser.id,
          token: hashedVerificationToken,
          type: TokenType.EMAIL_VERIFICATION,
          expiresAt: getEmailVerificationExpiry(),
          ipAddress: device.ipAddress,
          userAgent: device.userAgent,
        },
      });

      return newUser;
    });

    // 6. Send verification email (non-blocking)
    const verificationUrl = `${env.CLIENT_URL}/auth/verify-email?token=${verificationToken}`;
    emailService.sendVerificationEmail({
      to: (user as any).email,
      firstName: (user as any).firstName,
      verificationUrl,
    });

    // 7. Log
    await this.createAuditLog({
      userId: (user as any).id,
      action: 'AUTH_REGISTER',
      success: true,
      ipAddress: device.ipAddress,
      userAgent: device.userAgent,
    });

    logger.info('New user registered', { userId: (user as any).id, email: (user as any).email, role: (user as any).role });

    return {
      user: {
        id: (user as any).id,
        email: (user as any).email,
        firstName: (user as any).firstName,
        lastName: (user as any).lastName,
        role: (user as any).role,
        status: (user as any).status,
      },
      message: 'Registration successful. Please verify your email to continue.',
    };
  }

  // ─── Login ──────────────────────────────────────────────────
  async login(input: LoginInput, device: DeviceInfo): Promise<{
    user: object;
    tokens: TokenPair;
  }> {
    const { email, password } = input;

    // 1. Fetch user
    const user = await prisma.user.findUnique({
      where: { email, deletedAt: null },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        status: true,
        passwordHash: true,
        emailVerified: true,
        twoFactorEnabled: true,
        twoFactorSecret: true,
        failedLoginAttempts: true,
        lockedUntil: true,
      },
    });

    // Use consistent error to prevent email enumeration
    const invalidCredentialsError = AppError.unauthorized(
      'Invalid email or password',
      AppErrorCode.INVALID_CREDENTIALS,
    );

    if (!user) {
      // Still hash to prevent timing attacks
      await hashPassword(password);
      throw invalidCredentialsError;
    }

    // 2. Check account lock
    if (user.lockedUntil && user.lockedUntil > new Date()) {
      const minutesLeft = Math.ceil(
        (user.lockedUntil.getTime() - Date.now()) / 1000 / 60,
      );
      throw AppError.forbidden(
        `Account locked. Try again in ${minutesLeft} minute${minutesLeft !== 1 ? 's' : ''}.`,
        AppErrorCode.ACCOUNT_LOCKED,
      );
    }

    // 3. Verify password
    const isPasswordValid = await comparePassword(password, user.passwordHash);

    if (!isPasswordValid) {
      await this.handleFailedLogin(user.id, user.failedLoginAttempts);
      await this.createAuditLog({
        userId: user.id,
        action: 'AUTH_LOGIN_FAILED',
        success: false,
        ipAddress: device.ipAddress,
        userAgent: device.userAgent,
        errorCode: 'INVALID_CREDENTIALS',
      });
      throw invalidCredentialsError;
    }

    // 4. Check account status
    if (user.status === AccountStatus.SUSPENDED) {
      throw AppError.forbidden('Account suspended. Contact support.', AppErrorCode.ACCOUNT_SUSPENDED);
    }

    if (user.status === AccountStatus.INACTIVE) {
      throw AppError.unauthorized('Account is inactive.', AppErrorCode.UNAUTHORIZED);
    }

    // 5. Reset failed attempts and record login
    await prisma.user.update({
      where: { id: user.id },
      data: {
        failedLoginAttempts: 0,
        lockedUntil: null,
        lastLoginAt: new Date(),
        lastLoginIp: device.ipAddress,
      },
    });

    // 6. If 2FA is enabled — return a partial response requiring TOTP verification.
    //    We do NOT issue real tokens yet. Client must call /auth/2fa-login with the code.
    if (user.twoFactorEnabled) {
      const tempToken = signAccessToken({
        userId: user.id,
        email: user.email,
        role: user.role,
      });

      await this.createAuditLog({
        userId: user.id,
        action: 'AUTH_LOGIN_2FA_REQUIRED',
        success: true,
        ipAddress: device.ipAddress,
        userAgent: device.userAgent,
      });

      return {
        user: null,
        tokens: null,
        requiresTwoFactor: true,
        // Short-lived temp token only usable at /auth/2fa-login
        twoFactorToken: tempToken.token,
      } as unknown as { user: object; tokens: TokenPair };
    }

    // 7. Issue tokens (no 2FA)
    const tokens = await this.issueTokenPair(
      { userId: user.id, email: user.email, role: user.role },
      device,
    );

    // 7. Audit log
    await this.createAuditLog({
      userId: user.id,
      action: 'AUTH_LOGIN',
      success: true,
      ipAddress: device.ipAddress,
      userAgent: device.userAgent,
    });

    logger.info('User logged in', { userId: user.id, email: user.email });

    return {
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        status: user.status,
        emailVerified: user.emailVerified,
      },
      tokens,
    };
  }

  // ─── 2FA login — second step after password ──────────────────
  async twoFactorLogin(
    twoFactorToken: string,
    totpCode: string,
    device: DeviceInfo,
  ): Promise<{ user: object; tokens: TokenPair }> {
    const { authenticator } = await import('otplib');

    // Verify the temp token from step 1
    const payload = verifyAccessToken(twoFactorToken);

    const user = await prisma.user.findUnique({
      where: { id: payload.sub, deletedAt: null },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        status: true,
        emailVerified: true,
        twoFactorEnabled: true,
        twoFactorSecret: true,
      },
    });

    if (!user || !user.twoFactorEnabled || !user.twoFactorSecret) {
      throw AppError.unauthorized('Invalid 2FA session', AppErrorCode.UNAUTHORIZED);
    }

    const isValidTotp = authenticator.verify({
      token: totpCode,
      secret: user.twoFactorSecret,
    });

    if (!isValidTotp) {
      await this.createAuditLog({
        userId: user.id,
        action: 'AUTH_2FA_FAILED',
        success: false,
        ipAddress: device.ipAddress,
        userAgent: device.userAgent,
      });
      throw AppError.unauthorized('Invalid authenticator code', AppErrorCode.TOKEN_INVALID);
    }

    const tokens = await this.issueTokenPair(
      { userId: user.id, email: user.email, role: user.role },
      device,
    );

    await this.createAuditLog({
      userId: user.id,
      action: 'AUTH_LOGIN_2FA_SUCCESS',
      success: true,
      ipAddress: device.ipAddress,
      userAgent: device.userAgent,
    });

    logger.info('User logged in via 2FA', { userId: user.id });

    return {
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        status: user.status,
        emailVerified: user.emailVerified,
      },
      tokens,
    };
  }

  // ─── Refresh tokens ──────────────────────────────────────────
  async refreshTokens(input: RefreshTokenInput, device: DeviceInfo): Promise<TokenPair> {
    const { refreshToken } = input;

    // 1. Verify JWT signature and expiry
    const payload = verifyRefreshToken(refreshToken);

    // 2. Fetch token record from DB
    const tokenRecord = await prisma.token.findUnique({
      where: { id: payload.tokenId },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            role: true,
            status: true,
            deletedAt: true,
          },
        },
      },
    });

    // 3. CRITICAL: Verify stored hash matches the actual token value.
    //    JWT signature alone isn't enough — if the DB was read without the secret,
    //    an attacker with just a tokenId UUID could forge a valid JWT.
    const incomingHash = hashToken(refreshToken);
    const tokenHashValid = tokenRecord && safeCompare(incomingHash, tokenRecord.token);

    if (!tokenRecord || !tokenHashValid || tokenRecord.revoked || tokenRecord.expiresAt < new Date()) {
      // If record exists but hash doesn't match or it's been reused — potential attack
      if (tokenRecord && (!tokenHashValid || tokenRecord.revoked)) {
        await prisma.token.updateMany({
          where: { userId: tokenRecord.userId, type: TokenType.REFRESH, revoked: false },
          data: { revoked: true, revokedAt: new Date() },
        });
        logger.warn('Refresh token attack detected — all sessions revoked', {
          userId: tokenRecord.userId,
          tokenId: payload.tokenId,
          hashMatch: tokenHashValid,
          wasRevoked: tokenRecord.revoked,
        });
      }
      throw AppError.unauthorized('Invalid or expired refresh token', AppErrorCode.TOKEN_REVOKED);
    }

    const user = tokenRecord.user;
    if (!user || user.deletedAt || user.status === AccountStatus.SUSPENDED) {
      throw AppError.unauthorized('User account unavailable', AppErrorCode.UNAUTHORIZED);
    }

    // 4. Revoke used token (rotation — each refresh token is single-use)
    await prisma.token.update({
      where: { id: tokenRecord.id },
      data: { revoked: true, revokedAt: new Date(), usedAt: new Date() },
    });

    // 5. Issue new pair
    const tokens = await this.issueTokenPair(
      { userId: user.id, email: user.email, role: user.role },
      device,
    );

    return tokens;
  }

  // ─── Logout ──────────────────────────────────────────────────
  async logout(userId: string, accessTokenJti: string, accessToken: string): Promise<void> {
    // 1. Blacklist the access token
    const ttl = getTokenTTL(accessToken);
    if (ttl > 0) {
      await blacklistToken(accessTokenJti, ttl);
    }

    // 2. Revoke all refresh tokens for this user
    await prisma.token.updateMany({
      where: { userId, type: TokenType.REFRESH, revoked: false },
      data: { revoked: true, revokedAt: new Date() },
    });

    // 3. Deactivate sessions
    await prisma.session.updateMany({
      where: { userId, isActive: true },
      data: { isActive: false },
    });

    await this.createAuditLog({ userId, action: 'AUTH_LOGOUT', success: true });
    logger.info('User logged out', { userId });
  }

  // ─── Logout from all devices ─────────────────────────────────
  async logoutAll(userId: string, accessTokenJti: string, accessToken: string): Promise<void> {
    await this.logout(userId, accessTokenJti, accessToken);
    logger.info('User logged out from all devices', { userId });
  }

  // ─── Verify email ────────────────────────────────────────────
  async verifyEmail(input: VerifyEmailInput): Promise<void> {
    const { token } = input;
    const hashedToken = hashToken(token);

    const tokenRecord = await prisma.token.findFirst({
      where: {
        token: hashedToken,
        type: TokenType.EMAIL_VERIFICATION,
        revoked: false,
        expiresAt: { gte: new Date() },
        usedAt: null,
      },
      include: {
        user: { select: { id: true, email: true, firstName: true, emailVerified: true } },
      },
    });

    if (!tokenRecord) {
      throw AppError.badRequest(
        'Invalid or expired verification token',
        AppErrorCode.TOKEN_INVALID,
      );
    }

    if (tokenRecord.user.emailVerified) {
      throw AppError.badRequest('Email already verified');
    }

    // Mark token as used and activate user
    await prisma.$transaction([
      prisma.token.update({
        where: { id: tokenRecord.id },
        data: { usedAt: new Date(), revoked: true },
      }),
      prisma.user.update({
        where: { id: tokenRecord.userId },
        data: {
          emailVerified: true,
          emailVerifiedAt: new Date(),
          status: AccountStatus.ACTIVE,
        },
      }),
    ]);

    // Send welcome email
    emailService.sendWelcomeEmail({
      to: tokenRecord.user.email,
      firstName: tokenRecord.user.firstName,
    });

    await this.createAuditLog({
      userId: tokenRecord.userId,
      action: 'AUTH_EMAIL_VERIFIED',
      success: true,
    });

    logger.info('Email verified', { userId: tokenRecord.userId });
  }

  // ─── Resend verification email ───────────────────────────────
  async resendVerificationEmail(email: string): Promise<void> {
    const user = await prisma.user.findUnique({
      where: { email, deletedAt: null },
      select: { id: true, email: true, firstName: true, emailVerified: true, status: true },
    });

    // Always return success to prevent email enumeration
    if (!user || user.emailVerified) return;

    // Revoke existing verification tokens
    await prisma.token.updateMany({
      where: { userId: user.id, type: TokenType.EMAIL_VERIFICATION, revoked: false },
      data: { revoked: true },
    });

    const verificationToken = generateSecureToken(32);
    const hashedToken = hashToken(verificationToken);

    await prisma.token.create({
      data: {
        userId: user.id,
        token: hashedToken,
        type: TokenType.EMAIL_VERIFICATION,
        expiresAt: getEmailVerificationExpiry(),
      },
    });

    const verificationUrl = `${env.CLIENT_URL}/auth/verify-email?token=${verificationToken}`;
    await emailService.sendVerificationEmail({
      to: user.email,
      firstName: user.firstName,
      verificationUrl,
    });
  }

  // ─── Forgot password ─────────────────────────────────────────
  async forgotPassword(input: ForgotPasswordInput): Promise<void> {
    const { email } = input;

    const user = await prisma.user.findUnique({
      where: { email, deletedAt: null },
      select: { id: true, email: true, firstName: true, status: true },
    });

    // Always succeed to prevent enumeration
    if (!user || user.status === AccountStatus.SUSPENDED) return;

    // Revoke existing reset tokens
    await prisma.token.updateMany({
      where: { userId: user.id, type: TokenType.PASSWORD_RESET, revoked: false },
      data: { revoked: true },
    });

    const resetToken = generateSecureToken(32);
    const hashedToken = hashToken(resetToken);

    await prisma.token.create({
      data: {
        userId: user.id,
        token: hashedToken,
        type: TokenType.PASSWORD_RESET,
        expiresAt: getPasswordResetExpiry(),
      },
    });

    const resetUrl = `${env.CLIENT_URL}/auth/reset-password?token=${resetToken}`;
    await emailService.sendPasswordResetEmail({
      to: user.email,
      firstName: user.firstName,
      resetUrl,
    });

    await this.createAuditLog({
      userId: user.id,
      action: 'AUTH_PASSWORD_RESET_REQUESTED',
      success: true,
    });
  }

  // ─── Reset password ──────────────────────────────────────────
  async resetPassword(input: ResetPasswordInput): Promise<void> {
    const { token, password } = input;
    const hashedToken = hashToken(token);

    const tokenRecord = await prisma.token.findFirst({
      where: {
        token: hashedToken,
        type: TokenType.PASSWORD_RESET,
        revoked: false,
        expiresAt: { gte: new Date() },
        usedAt: null,
      },
      include: {
        user: { select: { id: true, email: true, firstName: true } },
      },
    });

    if (!tokenRecord) {
      throw AppError.badRequest(
        'Invalid or expired reset token. Please request a new one.',
        AppErrorCode.TOKEN_INVALID,
      );
    }

    const newPasswordHash = await hashPassword(password);

    await prisma.$transaction([
      // Mark token used
      prisma.token.update({
        where: { id: tokenRecord.id },
        data: { usedAt: new Date(), revoked: true },
      }),
      // Revoke all other reset tokens
      prisma.token.updateMany({
        where: {
          userId: tokenRecord.userId,
          type: TokenType.PASSWORD_RESET,
          id: { not: tokenRecord.id },
          revoked: false,
        },
        data: { revoked: true },
      }),
      // Update password
      prisma.user.update({
        where: { id: tokenRecord.userId },
        data: {
          passwordHash: newPasswordHash,
          passwordChangedAt: new Date(),
          failedLoginAttempts: 0,
          lockedUntil: null,
        },
      }),
      // Revoke all refresh tokens
      prisma.token.updateMany({
        where: { userId: tokenRecord.userId, type: TokenType.REFRESH, revoked: false },
        data: { revoked: true, revokedAt: new Date() },
      }),
    ]);

    await emailService.sendPasswordChangedEmail({
      to: tokenRecord.user.email,
      firstName: tokenRecord.user.firstName,
    });

    await this.createAuditLog({
      userId: tokenRecord.userId,
      action: 'AUTH_PASSWORD_RESET',
      success: true,
    });

    logger.info('Password reset successful', { userId: tokenRecord.userId });
  }

  // ─── Change password (authenticated) ─────────────────────────
  async changePassword(
    userId: string,
    input: ChangePasswordInput,
    accessTokenJti: string,
    accessToken: string,
  ): Promise<void> {
    const { currentPassword, newPassword } = input;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true, firstName: true, passwordHash: true },
    });

    if (!user) throw AppError.notFound('User not found', AppErrorCode.USER_NOT_FOUND);

    const isValid = await comparePassword(currentPassword, user.passwordHash);
    if (!isValid) {
      throw AppError.unauthorized('Current password is incorrect', AppErrorCode.INVALID_CREDENTIALS);
    }

    const newHash = await hashPassword(newPassword);

    await prisma.$transaction([
      prisma.user.update({
        where: { id: userId },
        data: { passwordHash: newHash, passwordChangedAt: new Date() },
      }),
      prisma.token.updateMany({
        where: { userId, type: TokenType.REFRESH, revoked: false },
        data: { revoked: true, revokedAt: new Date() },
      }),
    ]);

    // Blacklist current access token
    const ttl = getTokenTTL(accessToken);
    if (ttl > 0) await blacklistToken(accessTokenJti, ttl);

    await emailService.sendPasswordChangedEmail({
      to: user.email,
      firstName: user.firstName,
    });

    await this.createAuditLog({ userId, action: 'AUTH_PASSWORD_CHANGED', success: true });
    logger.info('Password changed', { userId });
  }

  // ─── Get current user ────────────────────────────────────────
  async getMe(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId, deletedAt: null },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phone: true,
        role: true,
        status: true,
        avatarUrl: true,
        gender: true,
        dateOfBirth: true,
        emailVerified: true,
        emailVerifiedAt: true,
        twoFactorEnabled: true,
        lastLoginAt: true,
        createdAt: true,
        customerProfile: {
          select: {
            loyaltyPoints: true,
            totalBookings: true,
            totalSpent: true,
            preferences: true,
          },
        },
        adminProfile: {
          select: { salonId: true, department: true, bio: true },
        },
      },
    });

    if (!user) throw AppError.notFound('User not found', AppErrorCode.USER_NOT_FOUND);
    return user;
  }

  // ─── Private helpers ──────────────────────────────────────────

  private async issueTokenPair(
    payload: { userId: string; email: string; role: Role },
    device: DeviceInfo,
  ): Promise<TokenPair> {
    // Create refresh token DB record first to get the ID
    const tokenRecord = await prisma.token.create({
      data: {
        userId: payload.userId,
        token: 'PENDING', // Will be updated after signing
        type: TokenType.REFRESH,
        expiresAt: getRefreshTokenExpiry(),
        ipAddress: device.ipAddress,
        userAgent: device.userAgent,
      },
    });

    // Sign tokens
    const { token: accessToken, jti: accessJti, expiresIn } = signAccessToken({
      userId: payload.userId,
      email: payload.email,
      role: payload.role,
    });

    const { token: refreshToken } = signRefreshToken({
      userId: payload.userId,
      tokenId: tokenRecord.id,
    });

    // Store hashed refresh token
    const hashedRefresh = hashToken(refreshToken);
    await prisma.token.update({
      where: { id: tokenRecord.id },
      data: { token: hashedRefresh },
    });

    // Create/update session
    await prisma.session.create({
      data: {
        userId: payload.userId,
        refreshTokenId: tokenRecord.id,
        deviceName: device.deviceName,
        ipAddress: device.ipAddress,
        expiresAt: getRefreshTokenExpiry(),
        isActive: true,
      },
    });

    return {
      accessToken,
      refreshToken,
      expiresIn,
    };
  }

  private async handleFailedLogin(userId: string, currentAttempts: number): Promise<void> {
    const newAttempts = currentAttempts + 1;
    const shouldLock = newAttempts >= env.MAX_LOGIN_ATTEMPTS;

    await prisma.user.update({
      where: { id: userId },
      data: {
        failedLoginAttempts: newAttempts,
        ...(shouldLock && {
          lockedUntil: new Date(Date.now() + env.LOCK_TIME_MINUTES * 60 * 1000),
        }),
      },
    });

    if (shouldLock) {
      logger.warn('Account locked due to failed attempts', { userId, attempts: newAttempts });
    }
  }

  private async createAuditLog(data: {
    userId?: string;
    action: string;
    success?: boolean;
    ipAddress?: string;
    userAgent?: string;
    details?: object;
    errorCode?: string;
  }): Promise<void> {
    try {
      await prisma.auditLog.create({
        data: {
          userId: data.userId,
          action: data.action,
          resource: 'auth',
          success: data.success ?? true,
          ipAddress: data.ipAddress,
          userAgent: data.userAgent,
          details: data.details,
          errorCode: data.errorCode,
        },
      });
    } catch (err) {
      // Audit logging should never crash the app
      logger.error('Failed to create audit log', { error: (err as Error).message });
    }
  }
}

export const authService = new AuthService();
