import { Role, AccountStatus } from '@prisma/client';
import { Request } from 'express';

// ─────────────────────────────────────────────────────────────
// JWT Payload
// ─────────────────────────────────────────────────────────────
export interface JwtAccessPayload {
  sub: string;      // User ID
  email: string;
  role: Role;
  jti: string;      // JWT ID for blacklisting
  iat?: number;
  exp?: number;
  iss?: string;
}

export interface JwtRefreshPayload {
  sub: string;
  jti: string;
  tokenId: string;  // DB token record ID
  iat?: number;
  exp?: number;
}

// ─────────────────────────────────────────────────────────────
// Authenticated Request
// ─────────────────────────────────────────────────────────────
export interface AuthenticatedRequest extends Request {
  user: {
    id: string;
    email: string;
    role: Role;
    jti: string;
    status?: AccountStatus;
  };
}

// ─────────────────────────────────────────────────────────────
// API Response wrappers
// ─────────────────────────────────────────────────────────────
export interface ApiSuccessResponse<T = unknown> {
  success: true;
  message: string;
  data: T;
  meta?: PaginationMeta;
  timestamp: string;
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  errors?: ValidationError[];
  code?: string;
  timestamp: string;
}

export interface ValidationError {
  field: string;
  message: string;
  code?: string;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

// ─────────────────────────────────────────────────────────────
// Pagination input
// ─────────────────────────────────────────────────────────────
export interface PaginationInput {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

// ─────────────────────────────────────────────────────────────
// Auth types
// ─────────────────────────────────────────────────────────────
export interface TokenPair {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface DeviceInfo {
  ipAddress?: string;
  userAgent?: string;
  deviceName?: string;
  browser?: string;
  os?: string;
}

export interface RegisterInput {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
  role?: Role;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface ForgotPasswordInput {
  email: string;
}

export interface ResetPasswordInput {
  token: string;
  password: string;
}

export interface ChangePasswordInput {
  currentPassword: string;
  newPassword: string;
}

// ─────────────────────────────────────────────────────────────
// Error codes — standardized across the API
// ─────────────────────────────────────────────────────────────
export enum AppErrorCode {
  // Auth
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',
  TOKEN_EXPIRED = 'TOKEN_EXPIRED',
  TOKEN_INVALID = 'TOKEN_INVALID',
  TOKEN_REVOKED = 'TOKEN_REVOKED',
  ACCOUNT_LOCKED = 'ACCOUNT_LOCKED',
  ACCOUNT_SUSPENDED = 'ACCOUNT_SUSPENDED',
  EMAIL_NOT_VERIFIED = 'EMAIL_NOT_VERIFIED',
  INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',

  // User
  USER_NOT_FOUND = 'USER_NOT_FOUND',
  USER_ALREADY_EXISTS = 'USER_ALREADY_EXISTS',
  EMAIL_ALREADY_TAKEN = 'EMAIL_ALREADY_TAKEN',
  PHONE_ALREADY_TAKEN = 'PHONE_ALREADY_TAKEN',

  // Validation
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  INVALID_INPUT = 'INVALID_INPUT',

  // Server
  INTERNAL_ERROR = 'INTERNAL_ERROR',
  NOT_FOUND = 'NOT_FOUND',
  RATE_LIMITED = 'RATE_LIMITED',
  SERVICE_UNAVAILABLE = 'SERVICE_UNAVAILABLE',
}
