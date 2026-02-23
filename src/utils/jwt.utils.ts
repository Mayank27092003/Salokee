import jwt, { SignOptions, JwtPayload } from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import ms from 'ms';
import { env } from '../config/env';
import { JwtAccessPayload, JwtRefreshPayload } from '../types';
import { AppError } from './AppError';
import { AppErrorCode } from '../types';
import { Role } from '@prisma/client';

// ─────────────────────────────────────────────────────────────
// Access Token
// ─────────────────────────────────────────────────────────────

export const signAccessToken = (payload: {
  userId: string;
  email: string;
  role: Role;
}): { token: string; jti: string; expiresIn: number } => {
  const jti = uuidv4();

  const tokenPayload: Omit<JwtAccessPayload, 'iat' | 'exp'> = {
    sub: payload.userId,
    email: payload.email,
    role: payload.role,
    jti,
  };

  const options: SignOptions = {
    expiresIn: env.JWT_ACCESS_EXPIRES_IN,
    issuer: env.JWT_ISSUER,
    algorithm: 'HS256',
  };

  const token = jwt.sign(tokenPayload as object, env.JWT_ACCESS_SECRET, options);
  const expiresIn = ms(env.JWT_ACCESS_EXPIRES_IN) / 1000; // seconds

  return { token, jti, expiresIn };
};

export const verifyAccessToken = (token: string): JwtAccessPayload => {
  try {
    const decoded = jwt.verify(token, env.JWT_ACCESS_SECRET, {
      issuer: env.JWT_ISSUER,
      algorithms: ['HS256'],
    }) as JwtAccessPayload;
    return decoded;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw AppError.unauthorized('Access token expired', AppErrorCode.TOKEN_EXPIRED);
    }
    if (error instanceof jwt.JsonWebTokenError) {
      throw AppError.unauthorized('Invalid access token', AppErrorCode.TOKEN_INVALID);
    }
    throw AppError.unauthorized('Token verification failed', AppErrorCode.TOKEN_INVALID);
  }
};

// ─────────────────────────────────────────────────────────────
// Refresh Token
// ─────────────────────────────────────────────────────────────

export const signRefreshToken = (payload: {
  userId: string;
  tokenId: string; // DB token record ID
}): { token: string; jti: string } => {
  const jti = uuidv4();

  const tokenPayload: Omit<JwtRefreshPayload, 'iat' | 'exp'> = {
    sub: payload.userId,
    jti,
    tokenId: payload.tokenId,
  };

  const options: SignOptions = {
    expiresIn: env.JWT_REFRESH_EXPIRES_IN,
    issuer: env.JWT_ISSUER,
    algorithm: 'HS256',
  };

  const token = jwt.sign(tokenPayload as object, env.JWT_REFRESH_SECRET, options);
  return { token, jti };
};

export const verifyRefreshToken = (token: string): JwtRefreshPayload => {
  try {
    const decoded = jwt.verify(token, env.JWT_REFRESH_SECRET, {
      issuer: env.JWT_ISSUER,
      algorithms: ['HS256'],
    }) as JwtRefreshPayload;
    return decoded;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw AppError.unauthorized('Refresh token expired', AppErrorCode.TOKEN_EXPIRED);
    }
    if (error instanceof jwt.JsonWebTokenError) {
      throw AppError.unauthorized('Invalid refresh token', AppErrorCode.TOKEN_INVALID);
    }
    throw AppError.unauthorized('Token verification failed', AppErrorCode.TOKEN_INVALID);
  }
};

// ─────────────────────────────────────────────────────────────
// Utility: decode without verifying (for extracting claims)
// ─────────────────────────────────────────────────────────────
export const decodeToken = (token: string): JwtPayload | null => {
  const decoded = jwt.decode(token);
  return decoded as JwtPayload | null;
};

// ─────────────────────────────────────────────────────────────
// Get remaining TTL in seconds from token exp
// ─────────────────────────────────────────────────────────────
export const getTokenTTL = (token: string): number => {
  const decoded = decodeToken(token);
  if (!decoded?.exp) return 0;
  const now = Math.floor(Date.now() / 1000);
  return Math.max(0, decoded.exp - now);
};

// ─────────────────────────────────────────────────────────────
// Compute expiry date for DB storage
// ─────────────────────────────────────────────────────────────
export const getRefreshTokenExpiry = (): Date => {
  const expiresInMs = ms(env.JWT_REFRESH_EXPIRES_IN);
  return new Date(Date.now() + expiresInMs);
};

export const getEmailVerificationExpiry = (): Date => {
  return new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
};

export const getPasswordResetExpiry = (): Date => {
  return new Date(Date.now() + 60 * 60 * 1000); // 1 hour
};
