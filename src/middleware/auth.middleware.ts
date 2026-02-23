import { Request, Response, NextFunction } from 'express';
import { Role, AccountStatus } from '@prisma/client';
import { verifyAccessToken } from '../utils/jwt.utils';
import { isTokenBlacklisted } from '../config/redis';
import { prisma } from '../config/database';
import { AppError } from '../utils/AppError';
import { AppErrorCode, AuthenticatedRequest } from '../types';
import { logger } from '../config/logger';

// ─────────────────────────────────────────────────────────────
// Extract Bearer token from Authorization header
// ─────────────────────────────────────────────────────────────
const extractBearerToken = (req: Request): string | null => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) return null;
  return authHeader.substring(7);
};

// ─────────────────────────────────────────────────────────────
// authenticate — verify JWT and attach user to request
// ─────────────────────────────────────────────────────────────
export const authenticate = async (
  req: Request,
  _res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const token = extractBearerToken(req);

    if (!token) {
      throw AppError.unauthorized('Authentication required', AppErrorCode.UNAUTHORIZED);
    }

    // 1. Verify JWT signature and expiry
    const payload = verifyAccessToken(token);

    // 2. Check token blacklist (for logged-out tokens)
    const blacklisted = await isTokenBlacklisted(payload.jti);
    if (blacklisted) {
      throw AppError.unauthorized('Token has been revoked', AppErrorCode.TOKEN_REVOKED);
    }

    // 3. Verify user still exists and is active
    const user = await prisma.user.findUnique({
      where: { id: payload.sub, deletedAt: null },
      select: {
        id: true,
        email: true,
        role: true,
        status: true,
        lockedUntil: true,
        passwordChangedAt: true,
      },
    });

    if (!user) {
      throw AppError.unauthorized('User no longer exists', AppErrorCode.UNAUTHORIZED);
    }

    // 4. Check account status
    if (user.status === AccountStatus.SUSPENDED) {
      throw AppError.forbidden('Account suspended', AppErrorCode.ACCOUNT_SUSPENDED);
    }

    if (user.status === AccountStatus.INACTIVE) {
      throw AppError.unauthorized('Account is inactive', AppErrorCode.UNAUTHORIZED);
    }

    // 5. Check account lock
    if (user.lockedUntil && user.lockedUntil > new Date()) {
      throw AppError.forbidden(
        `Account locked until ${user.lockedUntil.toISOString()}`,
        AppErrorCode.ACCOUNT_LOCKED,
      );
    }

    // 6. Invalidate tokens if password was changed after token was issued
    if (user.passwordChangedAt && payload.iat) {
      const passwordChangedTimestamp = Math.floor(user.passwordChangedAt.getTime() / 1000);
      if (passwordChangedTimestamp > payload.iat) {
        throw AppError.unauthorized(
          'Password was changed. Please log in again.',
          AppErrorCode.TOKEN_INVALID,
        );
      }
    }

    // Attach user to request
    (req as AuthenticatedRequest).user = {
      id: user.id,
      email: user.email,
      role: user.role,
      jti: payload.jti,
      status: user.status,
    };

    next();
  } catch (error) {
    next(error);
  }
};

// ─────────────────────────────────────────────────────────────
// authorize — role-based access control
// Usage: authorize(Role.ADMIN, Role.SUPER_ADMIN)
// ─────────────────────────────────────────────────────────────
export const authorize = (...roles: Role[]) => {
  return (req: Request, _res: Response, next: NextFunction): void => {
    const user = (req as AuthenticatedRequest).user;

    if (!user) {
      return next(AppError.unauthorized('Authentication required'));
    }

    if (!roles.includes(user.role)) {
      logger.warn('Unauthorized access attempt', {
        userId: user.id,
        userRole: user.role,
        requiredRoles: roles,
        path: req.path,
      });
      return next(
        AppError.forbidden(
          'You do not have permission to perform this action',
          AppErrorCode.FORBIDDEN,
        ),
      );
    }

    next();
  };
};

// ─────────────────────────────────────────────────────────────
// requireEmailVerified — gate routes behind email verification
// ─────────────────────────────────────────────────────────────
export const requireEmailVerified = async (
  req: Request,
  _res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const user = (req as AuthenticatedRequest).user;

    const dbUser = await prisma.user.findUnique({
      where: { id: user.id },
      select: { emailVerified: true },
    });

    if (!dbUser?.emailVerified) {
      throw AppError.forbidden(
        'Email verification required. Please verify your email first.',
        AppErrorCode.EMAIL_NOT_VERIFIED,
      );
    }

    next();
  } catch (error) {
    next(error);
  }
};

// ─────────────────────────────────────────────────────────────
// optionalAuth — attach user if token present but don't fail
// ─────────────────────────────────────────────────────────────
export const optionalAuth = async (
  req: Request,
  _res: Response,
  next: NextFunction,
): Promise<void> => {
  const token = extractBearerToken(req);
  if (!token) return next();

  try {
    const payload = verifyAccessToken(token);
    const blacklisted = await isTokenBlacklisted(payload.jti);
    if (!blacklisted) {
      const user = await prisma.user.findUnique({
        where: { id: payload.sub, deletedAt: null },
        select: { id: true, email: true, role: true, status: true },
      });
      if (user && user.status === AccountStatus.ACTIVE) {
        (req as AuthenticatedRequest).user = {
          id: user.id,
          email: user.email,
          role: user.role,
          jti: payload.jti,
          status: user.status,
        };
      }
    }
  } catch {
    // Silently ignore invalid tokens for optional auth
  }
  next();
};
