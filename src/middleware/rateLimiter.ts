import rateLimit from 'express-rate-limit';
import { Request, Response } from 'express';
import { env } from '../config/env';
import { AppErrorCode } from '../types';

// ─────────────────────────────────────────────────────────────
// Rate limiter factory
// ─────────────────────────────────────────────────────────────
const createLimiter = (options: {
  windowMs: number;
  max: number;
  message: string;
  skipSuccessfulRequests?: boolean;
}) =>
  rateLimit({
    windowMs: options.windowMs,
    max: options.max,
    skipSuccessfulRequests: options.skipSuccessfulRequests ?? false,
    standardHeaders: true,
    legacyHeaders: false,
    keyGenerator: (req: Request) => {
      // Use real IP even behind proxies
      return (
        (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ??
        req.socket.remoteAddress ??
        req.ip ??
        'unknown'
      );
    },
    handler: (_req: Request, res: Response) => {
      res.status(429).json({
        success: false,
        message: options.message,
        code: AppErrorCode.RATE_LIMITED,
        timestamp: new Date().toISOString(),
      });
    },
  });

// ─── General API limiter ──────────────────────────────────────
export const apiLimiter = createLimiter({
  windowMs: env.RATE_LIMIT_WINDOW_MS,
  max: env.RATE_LIMIT_MAX,
  message: 'Too many requests. Please try again later.',
});

// ─── Strict auth limiter (login, register) ────────────────────
export const authLimiter = createLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: env.AUTH_RATE_LIMIT_MAX,
  message: 'Too many authentication attempts. Please try again in 15 minutes.',
  skipSuccessfulRequests: true, // Only count failures
});

// ─── Password reset / email limiter ──────────────────────────
export const sensitiveOpLimiter = createLimiter({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5,
  message: 'Too many attempts. Please try again in 1 hour.',
});

// ─── Token refresh limiter ────────────────────────────────────
export const refreshLimiter = createLimiter({
  windowMs: 60 * 1000, // 1 minute
  max: 10,
  message: 'Too many token refresh requests.',
});
