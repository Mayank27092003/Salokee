import { Request, Response, NextFunction } from 'express';
import { Prisma } from '@prisma/client';
import { ZodError } from 'zod';
import { AppError } from '../utils/AppError';
import { AppErrorCode, ValidationError } from '../types';
import { logger } from '../config/logger';
import { isProd } from '../config/env';

// ─────────────────────────────────────────────────────────────
// Global error handler — must be last middleware
// ─────────────────────────────────────────────────────────────
export const globalErrorHandler = (
  error: Error,
  req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  // Already sent response guard
  if (res.headersSent) return;

  let statusCode = 500;
  let message = 'Internal server error';
  let code: string = AppErrorCode.INTERNAL_ERROR;
  let errors: ValidationError[] | undefined;
  let isOperational = false;

  // ─── Handle known error types ────────────────────────────────

  if (error instanceof AppError) {
    statusCode = error.statusCode;
    message = error.message;
    code = error.code;
    isOperational = error.isOperational;

  } else if (error instanceof ZodError) {
    // Zod validation errors
    statusCode = 422;
    message = 'Validation failed';
    code = AppErrorCode.VALIDATION_ERROR;
    isOperational = true;
    errors = error.errors.map((e) => ({
      field: e.path.join('.'),
      message: e.message,
      code: e.code,
    }));

  } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
    isOperational = true;
    statusCode = 400;

    switch (error.code) {
      case 'P2002': {
        // Unique constraint violation
        const field = (error.meta?.target as string[])?.join(', ') ?? 'field';
        message = `A record with this ${field} already exists`;
        code = AppErrorCode.USER_ALREADY_EXISTS;
        statusCode = 409;
        break;
      }
      case 'P2025':
        message = 'Record not found';
        code = AppErrorCode.NOT_FOUND;
        statusCode = 404;
        break;
      case 'P2003':
        message = 'Related record not found';
        code = AppErrorCode.NOT_FOUND;
        statusCode = 404;
        break;
      case 'P2014':
        message = 'Invalid relation data';
        code = AppErrorCode.INVALID_INPUT;
        break;
      default:
        message = 'Database operation failed';
        code = AppErrorCode.INTERNAL_ERROR;
        statusCode = 500;
        isOperational = false;
    }

  } else if (error instanceof Prisma.PrismaClientValidationError) {
    statusCode = 400;
    message = 'Invalid data provided';
    code = AppErrorCode.VALIDATION_ERROR;
    isOperational = true;

  } else if (error instanceof Prisma.PrismaClientInitializationError) {
    statusCode = 503;
    message = 'Database unavailable';
    code = AppErrorCode.SERVICE_UNAVAILABLE;
    isOperational = false;
  }

  // ─── Log the error ──────────────────────────────────────────
  const logData = {
    requestId: req.id,
    statusCode,
    code,
    path: req.path,
    method: req.method,
    ip: req.ip,
    userId: (req as { user?: { id: string } }).user?.id,
    isOperational,
  };

  if (statusCode >= 500) {
    logger.error(error.message, { ...logData, stack: error.stack });
  } else if (statusCode >= 400) {
    logger.warn(error.message, logData);
  }

  // ─── Send response ──────────────────────────────────────────
  const response: Record<string, unknown> = {
    success: false,
    message,
    code,
    requestId: req.id, // Always include so client can report it to support
    timestamp: new Date().toISOString(),
  };

  if (errors?.length) {
    response.errors = errors;
  }

  // Include stack trace in development only
  if (!isProd && !isOperational) {
    response.stack = error.stack;
  }

  res.status(statusCode).json(response);
};

// ─────────────────────────────────────────────────────────────
// 404 handler — for unmatched routes
// ─────────────────────────────────────────────────────────────
export const notFoundHandler = (req: Request, _res: Response, next: NextFunction): void => {
  next(
    AppError.notFound(`Route ${req.method} ${req.path} not found`, AppErrorCode.NOT_FOUND),
  );
};
