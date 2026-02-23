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
    require('fs').writeFileSync(1, '\n👉 STAGE 0: Bootstrapping Node...\n');
    logger.info(`🚀 Starting ${env.APP_NAME} in ${env.NODE_ENV} mode...`);

    // 1. Connect to database (fatal if fails)
    require('fs').writeFileSync(1, '👉 STAGE 1: Connecting Prisma...\n');
    await connectPrisma();

    // 2. Connect to Redis (non-fatal — graceful degradation)
    require('fs').writeFileSync(1, '👉 STAGE 2: Connecting Redis...\n');
    await connectRedis();

    // 3. Verify email service (non-fatal)
    require('fs').writeFileSync(1, '👉 STAGE 3: Verifying Email Service...\n');
    await emailService.verifyConnection();

    // 4. Create and start HTTP server
    require('fs').writeFileSync(1, '👉 STAGE 4: Creating Express App...\n');
    const app = createApp();
    const server = http.createServer(app);

    require('fs').writeFileSync(1, '👉 STAGE 5: Binding Port...\n');
    server.listen(env.PORT, '0.0.0.0', () => {
      require('fs').writeFileSync(1, `\n✅ SERVER SUCCESSFULLY BOUND TO PORT ${env.PORT} ✅\n`);
      logger.info(`✅ Server running on port ${env.PORT}`);
      logger.info(`📡 API: ${env.API_URL}/api/${env.API_VERSION}`);
      logger.info(`🏥 Health: ${env.API_URL}/health`);
    });

    // ─── Graceful shutdown ──────────────────────────────────
    const gracefulShutdown = async (signal: string) => {
      require('fs').writeFileSync(1, `\n🛑 SIGNAL RECEIVED: ${signal}\n`);
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
      require('fs').writeFileSync(1, `\n❌ UNCAUGHT EXCEPTION: ${error.message}\n${error.stack}\n`);
      logger.error('Uncaught exception', { error: error.message, stack: error.stack });
      gracefulShutdown('UNCAUGHT_EXCEPTION');
    });

    process.on('unhandledRejection', (reason: any) => {
      const message = reason?.message || String(reason);
      require('fs').writeFileSync(1, `\n❌ UNHANDLED REJECTION: ${message}\n`);
      logger.error('Unhandled rejection', { reason });

      // If it's a Redis connection closure, don't kill the server
      if (message.includes('Connection is closed')) {
        require('fs').writeFileSync(1, '⚠️ Non-fatal rejection (likely Redis) — server will remain active.\n');
        return;
      }

      gracefulShutdown('UNHANDLED_REJECTION');
    });
  } catch (error: any) {
    require('fs').writeFileSync(1, `\n❌ FATAL BOOTSTRAP ERROR: ${error.message}\n${error.stack}\n`);
    logger.error('Failed to start server', { error });
    process.exit(1);
  }
};

bootstrap();
