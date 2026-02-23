import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import hpp from 'hpp';
import swaggerUi from 'swagger-ui-express';
// @ts-expect-error no types
import xssClean from 'xss-clean';
import os from 'os';

import { env, corsOrigins, isProd } from './config/env';
import { logStream, logger } from './config/logger';
import { swaggerSpec } from './config/swagger';
import { prisma } from './config/database';
import { redis } from './config/redis';
import { apiLimiter } from './middleware/rateLimiter';
import { globalErrorHandler, notFoundHandler } from './middleware/error.middleware';
import { requestId } from './middleware/requestId.middleware';
import { metricsMiddleware, metricsHandler } from './middleware/metrics.middleware';

// Route modules
import { authRouter } from './modules/auth/auth.routes';
import { userRouter } from './modules/user/user.routes';
import { twoFactorRouter } from './modules/twoFactor/twoFactor.routes';
import { adminRouter } from './modules/admin/admin.routes';

// ─────────────────────────────────────────────────────────────
// App factory
// ─────────────────────────────────────────────────────────────
export const createApp = (): Application => {
  const app = express();

  if (isProd) app.set('trust proxy', 1);

  // ─── 1. Request ID (must be first) ──────────────────────
  app.use(requestId);

  // ─── 2. Security headers ──────────────────────────────────
  app.use(
    helmet({
      contentSecurityPolicy: isProd ? undefined : false,
      crossOriginEmbedderPolicy: false,
    }),
  );

  // ─── 3. CORS ──────────────────────────────────────────────
  app.use(
    cors({
      origin: (origin, callback) => {
        if (!origin || corsOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error(`CORS blocked: ${origin}`));
        }
      },
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      allowedHeaders: [
        'Content-Type', 'Authorization', 'X-Requested-With',
        'X-Device-Name', 'X-Request-ID', 'Accept',
      ],
      exposedHeaders: ['X-Request-ID', 'X-Response-Time', 'X-RateLimit-Remaining'],
    }),
  );

  // ─── 4. Body + cookie parsing ──────────────────────────────
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));
  app.use(cookieParser(env.COOKIE_SECRET));

  // ─── 5. Security sanitization ──────────────────────────────
  app.use(xssClean());
  app.use(hpp());

  // ─── 6. Compression ────────────────────────────────────────
  app.use(compression());

  // ─── 7. HTTP logging with request ID ──────────────────────
  morgan.token('id', (req: Request) => req.id);
  app.use(
    morgan(
      isProd
        ? ':id :remote-addr :method :url :status :res[content-length] - :response-time ms'
        : ':id :method :url :status :response-time ms',
      {
        stream: logStream,
        skip: (req) => req.url === '/health' || req.url === '/metrics',
      },
    ),
  );

  // ─── 8. Prometheus metrics ─────────────────────────────────
  app.use(metricsMiddleware);

  // ─── 9. Global rate limiting ───────────────────────────────
  app.use(`/api/${env.API_VERSION}`, apiLimiter);

  // ─────────────────────────────────────────────────────────────
  // System Routes
  // ─────────────────────────────────────────────────────────────

  app.get('/health', (_req: Request, res: Response) => {
    res.status(200).json({
      status: 'healthy',
      service: env.APP_NAME,
      version: process.env.npm_package_version ?? '1.0.0',
      timestamp: new Date().toISOString(),
      uptime: Math.floor(process.uptime()),
      environment: env.NODE_ENV,
    });
  });

  app.get('/health/deep', async (_req: Request, res: Response) => {
    const checks: Record<string, {
      status: 'healthy' | 'degraded' | 'down';
      latencyMs?: number;
      message?: string;
    }> = {};

    const dbStart = Date.now();
    try {
      await prisma.$queryRaw`SELECT 1`;
      checks.database = { status: 'healthy', latencyMs: Date.now() - dbStart };
    } catch (err) {
      checks.database = {
        status: 'down',
        latencyMs: Date.now() - dbStart,
        message: (err as Error).message,
      };
    }

    const redisStart = Date.now();
    try {
      await redis.ping();
      checks.redis = { status: 'healthy', latencyMs: Date.now() - redisStart };
    } catch {
      checks.redis = { status: 'degraded', message: 'Redis unavailable' };
    }

    const memUsage = process.memoryUsage();
    const totalHeapMb = Math.round(memUsage.heapTotal / 1024 / 1024);
    const usedHeapMb = Math.round(memUsage.heapUsed / 1024 / 1024);
    const heapPercent = Math.round((usedHeapMb / totalHeapMb) * 100);
    checks.memory = {
      status: heapPercent > 90 ? 'degraded' : 'healthy',
      message: `${usedHeapMb}MB / ${totalHeapMb}MB (${heapPercent}%)`,
    };

    const allStatuses = Object.values(checks).map((c) => c.status);
    const overallStatus = allStatuses.includes('down')
      ? 'down'
      : allStatuses.includes('degraded') ? 'degraded' : 'healthy';

    if (overallStatus !== 'healthy') logger.warn('Health check degraded', { checks });

    res.status(overallStatus === 'down' ? 503 : 200).json({
      status: overallStatus,
      service: env.APP_NAME,
      environment: env.NODE_ENV,
      timestamp: new Date().toISOString(),
      uptime: {
        seconds: Math.floor(process.uptime()),
        human: formatUptime(process.uptime()),
      },
      system: {
        platform: os.platform(),
        nodeVersion: process.version,
        cpuCount: os.cpus().length,
        freeMemoryMb: Math.round(os.freemem() / 1024 / 1024),
        totalMemoryMb: Math.round(os.totalmem() / 1024 / 1024),
        loadAverage: os.loadavg().map((v) => +v.toFixed(2)),
      },
      checks,
    });
  });

  // Prometheus metrics (protect with IP allowlist in production via Nginx)
  app.get('/metrics', metricsHandler);

  // ─────────────────────────────────────────────────────────────
  // API Routes
  // ─────────────────────────────────────────────────────────────

  app.get(`/api/${env.API_VERSION}`, (_req: Request, res: Response) => {
    res.status(200).json({
      success: true,
      message: `${env.APP_NAME} API`,
      version: env.API_VERSION,
      docs: `${env.API_URL}/api/${env.API_VERSION}/docs`,
      health: `${env.API_URL}/health/deep`,
      metrics: `${env.API_URL}/metrics`,
      timestamp: new Date().toISOString(),
    });
  });

  // ─── Swagger UI ───────────────────────────────────────────
  const swaggerUiOptions: swaggerUi.SwaggerUiOptions = {
    customCss: `
      .topbar { background: #1e1e2e !important; }
      .topbar-wrapper img { display: none; }
      .topbar-wrapper::before {
        content: "💇 ${env.APP_NAME} API";
        color: white; font-size: 18px; font-weight: 600;
      }
      .swagger-ui .info .title { color: #2563eb; }
    `,
    customSiteTitle: `${env.APP_NAME} — API Docs`,
    swaggerOptions: {
      persistAuthorization: true,
      displayRequestDuration: true,
      filter: true,
      tryItOutEnabled: !isProd,
    },
  };

  app.use(
    `/api/${env.API_VERSION}/docs`,
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, swaggerUiOptions),
  );

  // OpenAPI JSON for client SDK generation (Postman, etc.)
  app.get(`/api/${env.API_VERSION}/docs.json`, (_req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });

  // ─── Feature modules ──────────────────────────────────────
  app.use(`/api/${env.API_VERSION}/auth`, authRouter);
  app.use(`/api/${env.API_VERSION}/users`, userRouter);
  app.use(`/api/${env.API_VERSION}/2fa`, twoFactorRouter);
  app.use(`/api/${env.API_VERSION}/admin`, adminRouter);

  // Phase 2 stubs (uncomment as built):
  // app.use(`/api/${env.API_VERSION}/salons`, salonRouter);
  // app.use(`/api/${env.API_VERSION}/services`, serviceRouter);
  // app.use(`/api/${env.API_VERSION}/staff`, staffRouter);
  // app.use(`/api/${env.API_VERSION}/appointments`, appointmentRouter);

  // ─── Error handling (always last) ─────────────────────────
  app.use(notFoundHandler);
  app.use(globalErrorHandler);

  return app;
};

const formatUptime = (seconds: number): string => {
  const d = Math.floor(seconds / 86400);
  const h = Math.floor((seconds % 86400) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  return [d && `${d}d`, h && `${h}h`, m && `${m}m`, `${s}s`].filter(Boolean).join(' ');
};
