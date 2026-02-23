import 'dotenv/config';
import http from 'http';
import { createApp } from './app';
import { env } from './config/env';
import { logger } from './config/logger';
import { connectPrisma, disconnectPrisma } from './config/database';
import { connectRedis, disconnectRedis } from './config/redis';
import { emailService } from './utils/email.utils';

// ─────────────────────────────────────────────────────────────
// Bootstrap
// ─────────────────────────────────────────────────────────────
const bootstrap = async () => {
  try {
    logger.info(`🚀 Starting ${env.APP_NAME} in ${env.NODE_ENV} mode...`);

    // 1. Connect to database (fatal if fails)
    await connectPrisma();

    // 2. Connect to Redis (non-fatal — graceful degradation)
    await connectRedis();

    // 3. Verify email service (non-fatal)
    await emailService.verifyConnection();

    // 4. Create and start HTTP server
    const app = createApp();
    const server = http.createServer(app);

    server.listen(env.PORT, () => {
      logger.info(`✅ Server running on port ${env.PORT}`);
      logger.info(`📡 API: ${env.API_URL}/api/${env.API_VERSION}`);
      logger.info(`🏥 Health: ${env.API_URL}/health`);
    });

    // ─── Graceful shutdown ──────────────────────────────────
    const gracefulShutdown = async (signal: string) => {
      logger.info(`\n${signal} received — shutting down gracefully...`);

      // Stop accepting new connections
      server.close(async () => {
        logger.info('HTTP server closed');

        // Cleanup
        await disconnectPrisma();
        await disconnectRedis();

        logger.info('Cleanup complete. Exiting.');
        process.exit(0);
      });

      // Force kill after 10s
      setTimeout(() => {
        logger.error('Forced shutdown after timeout');
        process.exit(1);
      }, 10_000);
    };

    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));

    // ─── Uncaught error handlers ──────────────────────────
    process.on('uncaughtException', (error) => {
      logger.error('Uncaught exception', { error: error.message, stack: error.stack });
      gracefulShutdown('UNCAUGHT_EXCEPTION');
    });

    process.on('unhandledRejection', (reason) => {
      logger.error('Unhandled rejection', { reason });
      gracefulShutdown('UNHANDLED_REJECTION');
    });
  } catch (error) {
    logger.error('Failed to start server', { error });
    process.exit(1);
  }
};

bootstrap();
