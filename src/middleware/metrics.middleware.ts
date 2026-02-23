import { Request, Response, NextFunction } from 'express';
import client from 'prom-client';
import { env } from '../config/env';

// ─────────────────────────────────────────────────────────────
// Prometheus Metrics Registry
// Exposes /metrics for Prometheus scraping (Grafana dashboards)
// ─────────────────────────────────────────────────────────────

const register = new client.Registry();

// Default Node.js metrics (event loop lag, GC, heap, etc.)
client.collectDefaultMetrics({
  register,
  prefix: 'salon_',
  labels: { app: env.APP_NAME, env: env.NODE_ENV },
});

// ─── Custom metrics ───────────────────────────────────────────

/** Total HTTP requests */
export const httpRequestsTotal = new client.Counter({
  name: 'salon_http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status_code'],
  registers: [register],
});

/** HTTP request duration histogram */
export const httpRequestDurationMs = new client.Histogram({
  name: 'salon_http_request_duration_ms',
  help: 'HTTP request duration in milliseconds',
  labelNames: ['method', 'route', 'status_code'],
  buckets: [5, 10, 25, 50, 100, 250, 500, 1000, 2500, 5000],
  registers: [register],
});

/** Active HTTP connections */
export const httpActiveConnections = new client.Gauge({
  name: 'salon_http_active_connections',
  help: 'Number of active HTTP connections',
  registers: [register],
});

/** Authentication events */
export const authEvents = new client.Counter({
  name: 'salon_auth_events_total',
  help: 'Authentication event counts',
  labelNames: ['event'], // login_success, login_failure, register, logout, token_refresh
  registers: [register],
});

/** Database query duration */
export const dbQueryDurationMs = new client.Histogram({
  name: 'salon_db_query_duration_ms',
  help: 'Database query duration in milliseconds',
  labelNames: ['operation'],
  buckets: [1, 5, 10, 25, 50, 100, 250, 500, 1000],
  registers: [register],
});

/** Email send counter */
export const emailsSentTotal = new client.Counter({
  name: 'salon_emails_sent_total',
  help: 'Total emails sent',
  labelNames: ['type', 'status'],
  registers: [register],
});

/** Rate limit hits */
export const rateLimitHits = new client.Counter({
  name: 'salon_rate_limit_hits_total',
  help: 'Total rate limit hits',
  labelNames: ['endpoint'],
  registers: [register],
});

// ─── Middleware ───────────────────────────────────────────────
export const metricsMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  httpActiveConnections.inc();

  res.on('finish', () => {
    httpActiveConnections.dec();

    // Normalize route (replace IDs with :param to avoid high cardinality)
    const route = req.route?.path ?? req.path.replace(/\/[0-9a-f-]{8,}/gi, '/:id');

    httpRequestsTotal.inc({
      method: req.method,
      route,
      status_code: res.statusCode,
    });

    httpRequestDurationMs.observe(
      { method: req.method, route, status_code: res.statusCode },
      Date.now() - req.startTime,
    );
  });

  next();
};

// ─── Metrics endpoint handler ─────────────────────────────────
export const metricsHandler = async (_req: Request, res: Response): Promise<void> => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
};

export { register };
