import { PrismaClient } from '@prisma/client';
import { logger } from './logger';
import { isDev } from './env';

// ─────────────────────────────────────────────────────────────
// Prevent multiple instances in development (hot reload)
// ─────────────────────────────────────────────────────────────
declare global {
  // eslint-disable-next-line no-var
  var __prisma: PrismaClient | undefined;
}

const createPrismaClient = () => {
  const baseClient = new PrismaClient({
    log: isDev
      ? [
          { emit: 'event', level: 'query' },
          { emit: 'event', level: 'error' },
          { emit: 'event', level: 'warn' },
        ]
      : [{ emit: 'event', level: 'error' }],
    errorFormat: isDev ? 'pretty' : 'minimal',
  });

  if (isDev) {
    // @ts-expect-error — Prisma event typing
    baseClient.$on('query', (e: { query: string; duration: number }) => {
      if (e.duration > 1000) {
        logger.warn('Slow query detected', {
          query: e.query,
          duration: `${e.duration}ms`,
        });
      }
    });
  }

  // @ts-expect-error — Prisma event typing
  baseClient.$on('error', (e: { message: string }) => {
    logger.error('Prisma error', { message: e.message });
  });

  // ─── Soft-delete extension ──────────────────────────────────
  // Automatically filters out soft-deleted records on findMany/findFirst/count
  // so Phase 2 devs can't accidentally expose deleted data.
  //
  // Override for admin use: prisma.$extends won't apply to raw queries.
  // To fetch deleted records intentionally, use: { where: { deletedAt: { not: null } } }
  const client = baseClient.$extends({
    query: {
      user: {
        async findMany({ args, query }) {
          args.where = { deletedAt: null, ...args.where };
          return query(args);
        },
        async findFirst({ args, query }) {
          args.where = { deletedAt: null, ...args.where };
          return query(args);
        },
        async count({ args, query }) {
          args.where = { deletedAt: null, ...args.where };
          return query(args);
        },
      },
      salon: {
        async findMany({ args, query }) {
          args.where = { deletedAt: null, ...args.where };
          return query(args);
        },
        async findFirst({ args, query }) {
          args.where = { deletedAt: null, ...args.where };
          return query(args);
        },
        async count({ args, query }) {
          args.where = { deletedAt: null, ...args.where };
          return query(args);
        },
      },
    },
  });

  return client;
};

export const prisma = global.__prisma ?? createPrismaClient();

if (isDev) {
  // @ts-expect-error — extended client type differs slightly
  global.__prisma = prisma;
}

// ─────────────────────────────────────────────────────────────
// Connection helpers
// ─────────────────────────────────────────────────────────────
export const disconnectPrisma = async () => {
  await (prisma as unknown as PrismaClient).$disconnect();
  logger.info('Prisma disconnected');
};

export const connectPrisma = async () => {
  try {
    await (prisma as unknown as PrismaClient).$connect();
    logger.info('✅ Database connected successfully');
  } catch (error) {
    logger.error('❌ Database connection failed', { error });
    process.exit(1);
  }
};
