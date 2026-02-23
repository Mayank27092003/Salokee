import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';

declare global {
  namespace Express {
    interface Request {
      id: string;
      startTime: number;
    }
  }
}

// ─────────────────────────────────────────────────────────────
// Request ID — stamps every request with a unique trace ID
// Clients can pass X-Request-ID to correlate their own traces
// ─────────────────────────────────────────────────────────────
export const requestId = (req: Request, res: Response, next: NextFunction): void => {
  const id = (req.headers['x-request-id'] as string) ?? uuidv4();
  req.id = id;
  req.startTime = Date.now();

  // Echo it back in every response
  res.setHeader('X-Request-ID', id);

  next();
};
