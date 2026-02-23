import { AppErrorCode } from '../types';

// ─────────────────────────────────────────────────────────────
// Custom application error class
// ─────────────────────────────────────────────────────────────
export class AppError extends Error {
  public readonly statusCode: number;
  public readonly code: AppErrorCode;
  public readonly isOperational: boolean;
  public readonly details?: unknown;

  constructor(
    message: string,
    statusCode: number = 500,
    code: AppErrorCode = AppErrorCode.INTERNAL_ERROR,
    details?: unknown,
    isOperational: boolean = true,
  ) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    this.statusCode = statusCode;
    this.code = code;
    this.isOperational = isOperational;
    this.details = details;
    Error.captureStackTrace(this);
  }

  // ─── Static factory methods ────────────────────────────────
  static badRequest(message: string, code?: AppErrorCode, details?: unknown) {
    return new AppError(message, 400, code ?? AppErrorCode.INVALID_INPUT, details);
  }

  static unauthorized(message = 'Unauthorized', code?: AppErrorCode) {
    return new AppError(message, 401, code ?? AppErrorCode.UNAUTHORIZED);
  }

  static forbidden(message = 'Forbidden', code?: AppErrorCode) {
    return new AppError(message, 403, code ?? AppErrorCode.FORBIDDEN);
  }

  static notFound(message = 'Resource not found', code?: AppErrorCode) {
    return new AppError(message, 404, code ?? AppErrorCode.NOT_FOUND);
  }

  static conflict(message: string, code?: AppErrorCode) {
    return new AppError(message, 409, code ?? AppErrorCode.USER_ALREADY_EXISTS);
  }

  static tooManyRequests(message = 'Too many requests', code?: AppErrorCode) {
    return new AppError(message, 429, code ?? AppErrorCode.RATE_LIMITED);
  }

  static internal(message = 'Internal server error', details?: unknown) {
    return new AppError(message, 500, AppErrorCode.INTERNAL_ERROR, details, false);
  }

  static validation(message: string, details?: unknown) {
    return new AppError(message, 422, AppErrorCode.VALIDATION_ERROR, details);
  }
}
