import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';
import { AppErrorCode, ValidationError } from '../types';

// ─────────────────────────────────────────────────────────────
// Validate request body, params, or query against a Zod schema
// ─────────────────────────────────────────────────────────────

type ValidationTarget = 'body' | 'params' | 'query';

export const validate =
  (schema: ZodSchema, target: ValidationTarget = 'body') =>
  (req: Request, res: Response, next: NextFunction): void => {
    try {
      const parsed = schema.parse(req[target]);
      req[target] = parsed; // Replace with sanitized/transformed data
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errors: ValidationError[] = error.errors.map((e) => ({
          field: e.path.join('.'),
          message: e.message,
          code: e.code,
        }));

        res.status(422).json({
          success: false,
          message: 'Validation failed',
          code: AppErrorCode.VALIDATION_ERROR,
          errors,
          timestamp: new Date().toISOString(),
        });
        return;
      }
      next(error);
    }
  };
