import { Request, Response, NextFunction } from 'express';
import { authService } from './auth.service';
import { sendSuccess, sendCreated, sendNoContent } from '../../utils/response.utils';
import { AuthenticatedRequest } from '../../types';
import { env, isProd } from '../../config/env';

// ─────────────────────────────────────────────────────────────
// Cookie config for refresh token
// ─────────────────────────────────────────────────────────────
const REFRESH_COOKIE_NAME = 'salon_refresh_token';

const refreshCookieOptions = {
  httpOnly: true,
  secure: isProd || env.COOKIE_SECURE,
  sameSite: 'strict' as const,
  domain: env.COOKIE_DOMAIN,
  path: '/api/v1/auth',
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};

// ─────────────────────────────────────────────────────────────
// Extract device info from request
// ─────────────────────────────────────────────────────────────
const getDeviceInfo = (req: Request) => ({
  ipAddress:
    (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ??
    req.socket.remoteAddress ??
    req.ip,
  userAgent: req.headers['user-agent'],
  deviceName: req.headers['x-device-name'] as string | undefined,
});

// ─────────────────────────────────────────────────────────────
// Controller
// ─────────────────────────────────────────────────────────────
export class AuthController {
  async register(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await authService.register(req.body, getDeviceInfo(req));
      sendCreated(res, result, result.message);
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await authService.login(req.body, getDeviceInfo(req)) as {
        user: object | null;
        tokens: { accessToken: string; refreshToken: string; expiresIn: number } | null;
        requiresTwoFactor?: boolean;
        twoFactorToken?: string;
      };

      // 2FA required — return partial response, no real tokens yet
      if (result.requiresTwoFactor) {
        sendSuccess(
          res,
          { requiresTwoFactor: true, twoFactorToken: result.twoFactorToken },
          'Two-factor authentication required',
        );
        return;
      }

      // Normal login — set refresh cookie and return tokens
      res.cookie(REFRESH_COOKIE_NAME, result.tokens!.refreshToken, refreshCookieOptions);

      sendSuccess(
        res,
        {
          user: result.user,
          accessToken: result.tokens!.accessToken,
          expiresIn: result.tokens!.expiresIn,
        },
        'Login successful',
      );
    } catch (error) {
      next(error);
    }
  }

  async twoFactorLogin(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { twoFactorToken, code } = req.body;
      const result = await authService.twoFactorLogin(twoFactorToken, code, getDeviceInfo(req));

      res.cookie(REFRESH_COOKIE_NAME, result.tokens.refreshToken, refreshCookieOptions);

      sendSuccess(
        res,
        {
          user: result.user,
          accessToken: result.tokens.accessToken,
          expiresIn: result.tokens.expiresIn,
        },
        'Login successful',
      );
    } catch (error) {
      next(error);
    }
  }

  async refreshTokens(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      // Accept from cookie OR request body
      const refreshToken = req.cookies?.[REFRESH_COOKIE_NAME] ?? req.body?.refreshToken;

      if (!refreshToken) {
        res.status(401).json({
          success: false,
          message: 'Refresh token required',
          timestamp: new Date().toISOString(),
        });
        return;
      }

      const tokens = await authService.refreshTokens(
        { refreshToken },
        getDeviceInfo(req),
      );

      // Rotate cookie
      res.cookie(REFRESH_COOKIE_NAME, tokens.refreshToken, refreshCookieOptions);

      sendSuccess(
        res,
        {
          accessToken: tokens.accessToken,
          expiresIn: tokens.expiresIn,
        },
        'Tokens refreshed',
      );
    } catch (error) {
      next(error);
    }
  }

  async logout(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const authReq = req as AuthenticatedRequest;
      const token = req.headers.authorization?.substring(7) ?? '';

      await authService.logout(authReq.user.id, authReq.user.jti, token);

      // Clear refresh cookie
      res.clearCookie(REFRESH_COOKIE_NAME, { path: '/api/v1/auth' });

      sendNoContent(res);
    } catch (error) {
      next(error);
    }
  }

  async logoutAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const authReq = req as AuthenticatedRequest;
      const token = req.headers.authorization?.substring(7) ?? '';

      await authService.logoutAll(authReq.user.id, authReq.user.jti, token);

      res.clearCookie(REFRESH_COOKIE_NAME, { path: '/api/v1/auth' });

      sendSuccess(res, null, 'Logged out from all devices');
    } catch (error) {
      next(error);
    }
  }

  async verifyEmail(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await authService.verifyEmail(req.body);
      sendSuccess(res, null, 'Email verified successfully. You can now log in.');
    } catch (error) {
      next(error);
    }
  }

  async resendVerification(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await authService.resendVerificationEmail(req.body.email);
      sendSuccess(
        res,
        null,
        'If an unverified account exists with that email, a verification link has been sent.',
      );
    } catch (error) {
      next(error);
    }
  }

  async forgotPassword(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await authService.forgotPassword(req.body);
      sendSuccess(
        res,
        null,
        'If an account with that email exists, a password reset link has been sent.',
      );
    } catch (error) {
      next(error);
    }
  }

  async resetPassword(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await authService.resetPassword(req.body);
      sendSuccess(res, null, 'Password reset successful. Please log in with your new password.');
    } catch (error) {
      next(error);
    }
  }

  async changePassword(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const authReq = req as AuthenticatedRequest;
      const token = req.headers.authorization?.substring(7) ?? '';

      await authService.changePassword(authReq.user.id, req.body, authReq.user.jti, token);

      res.clearCookie(REFRESH_COOKIE_NAME, { path: '/api/v1/auth' });
      sendSuccess(res, null, 'Password changed successfully. Please log in again.');
    } catch (error) {
      next(error);
    }
  }

  async getMe(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const authReq = req as AuthenticatedRequest;
      const user = await authService.getMe(authReq.user.id);
      sendSuccess(res, { user }, 'Profile retrieved');
    } catch (error) {
      next(error);
    }
  }
}

export const authController = new AuthController();
