import Redis from 'ioredis';
import { env, isProd } from './env';
import { logger } from './logger';

// ─────────────────────────────────────────────────────────────
// Redis Client Stability Layer
// Since Render free tier often lacks Redis, we use an "Air Gap"
// strategy to prevent connection attempts and async crashes.
// ─────────────────────────────────────────────────────────────

// Determine if we should even try to use Redis
const shouldSkipRedis = isProd &&
  (env.REDIS_HOST === 'localhost' || !env.REDIS_HOST || env.REDIS_HOST.includes('127.0.0.1'));

let isRedisActive = !shouldSkipRedis;

const createRedisClient = () => {
  if (!isRedisActive) {
    return null;
  }

  const client = new Redis({
    host: env.REDIS_HOST,
    port: env.REDIS_PORT,
    password: env.REDIS_PASSWORD || undefined,
    db: env.REDIS_DB,
    tls: env.REDIS_TLS ? {} : undefined,
    retryStrategy: (times) => {
      // Very conservative retry strategy
      if (times > 2) {
        logger.error('Redis retry limit reached — deactivating Redis module');
        isRedisActive = false;
        return null; // Stop retrying
      }
      return Math.min(times * 500, 2000);
    },
    enableOfflineQueue: false,
    lazyConnect: true,
    connectTimeout: 5000,
    maxRetriesPerRequest: 0, // CRITICAL: Stop ioredis from throwing unhandled rejections on disconnect
  });

  client.on('connect', () => logger.info('✅ Redis connected'));
  client.on('error', (err) => {
    if (isRedisActive) {
      logger.warn('Redis connection error (Non-fatal)', { error: err.message });
    }
  });

  return client;
};

export const redis = createRedisClient();

export const connectRedis = async (): Promise<boolean> => {
  if (!isRedisActive || !redis) {
    logger.warn('⚠️  Redis skipped (Air-Gapped) — running in standalone mode');
    return false;
  }

  try {
    if (redis.status === 'wait') {
      await redis.connect().catch(() => { });
    }

    if (redis.status === 'ready' || redis.status === 'connect') {
      await redis.ping();
      return true;
    }
    return false;
  } catch (error) {
    isRedisActive = false;
    logger.warn('⚠️  Redis failed to initialize — disabling caching', {
      error: (error as Error).message,
    });
    return false;
  }
};

export const disconnectRedis = async () => {
  if (redis) await redis.quit();
};

// ─────────────────────────────────────────────────────────────
// Safe Redis Helpers (No-op if inactive)
// ─────────────────────────────────────────────────────────────

export const redisSet = async (key: string, value: string, ttl?: number): Promise<boolean> => {
  if (!isRedisActive || !redis) return false;
  try {
    if (ttl) await redis.setex(key, ttl, value);
    else await redis.set(key, value);
    return true;
  } catch { return false; }
};

export const redisGet = async (key: string): Promise<string | null> => {
  if (!isRedisActive || !redis) return null;
  try { return await redis.get(key); } catch { return null; }
};

export const redisDel = async (key: string): Promise<boolean> => {
  if (!isRedisActive || !redis) return false;
  try { await redis.del(key); return true; } catch { return false; }
};

export const redisExists = async (key: string): Promise<boolean> => {
  if (!isRedisActive || !redis) return false;
  try { return (await redis.exists(key)) === 1; } catch { return false; }
};

export const BLACKLIST_PREFIX = 'blacklist:token:';
export const SESSION_PREFIX = 'session:';
export const RATE_LIMIT_PREFIX = 'rl:';

export const blacklistToken = async (jti: string, ttl: number): Promise<void> => {
  await redisSet(`${BLACKLIST_PREFIX}${jti}`, '1', ttl);
};

export const isTokenBlacklisted = async (jti: string): Promise<boolean> => {
  return redisExists(`${BLACKLIST_PREFIX}${jti}`);
};
