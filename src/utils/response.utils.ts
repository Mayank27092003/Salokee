import { Response } from 'express';
import {
  ApiSuccessResponse,
  ApiErrorResponse,
  PaginationMeta,
  ValidationError,
} from '../types';

// ─────────────────────────────────────────────────────────────
// Response helpers — always use these for consistent API format
// ─────────────────────────────────────────────────────────────

export const sendSuccess = <T>(
  res: Response,
  data: T,
  message = 'Success',
  statusCode = 200,
  meta?: PaginationMeta,
): Response => {
  const response: ApiSuccessResponse<T> = {
    success: true,
    message,
    data,
    timestamp: new Date().toISOString(),
    ...(meta && { meta }),
  };
  return res.status(statusCode).json(response);
};

export const sendCreated = <T>(res: Response, data: T, message = 'Created successfully'): Response =>
  sendSuccess(res, data, message, 201);

export const sendNoContent = (res: Response): Response => res.status(204).send();

export const sendError = (
  res: Response,
  message: string,
  statusCode = 500,
  code?: string,
  errors?: ValidationError[],
): Response => {
  const response: ApiErrorResponse = {
    success: false,
    message,
    timestamp: new Date().toISOString(),
    ...(code && { code }),
    ...(errors?.length && { errors }),
  };
  return res.status(statusCode).json(response);
};

// ─────────────────────────────────────────────────────────────
// Pagination builder
// ─────────────────────────────────────────────────────────────
export const buildPaginationMeta = (
  total: number,
  page: number,
  limit: number,
): PaginationMeta => {
  const totalPages = Math.ceil(total / limit);
  return {
    page,
    limit,
    total,
    totalPages,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1,
  };
};

// ─────────────────────────────────────────────────────────────
// Parse pagination query params
// ─────────────────────────────────────────────────────────────
export const parsePagination = (
  query: Record<string, unknown>,
  defaultLimit = 20,
  maxLimit = 100,
): { page: number; limit: number; skip: number } => {
  const page = Math.max(1, Number(query.page) || 1);
  const limit = Math.min(maxLimit, Math.max(1, Number(query.limit) || defaultLimit));
  const skip = (page - 1) * limit;
  return { page, limit, skip };
};
