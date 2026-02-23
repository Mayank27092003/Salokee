import Redis from 'ioredis';
import { env } from './env';
import { logger } from './logger';

// ─────────────────────────────────────────────────────────────
// Redis Client — used for token blacklisting, rate limiting,
// session caching, and general caching
// ─────────────────────────────────────────────────────────────

const createRedisClient = () => {
  const client = new Redis({
    host: env.REDIS_HOST,
    port: env.REDIS_PORT,
    password: env.REDIS_PASSWORD || undefined,
    db: env.REDIS_DB,
    tls: env.REDIS_TLS ? {} : undefined,
    retryStrategy: (times) => {
      if (times > 3) {
        logger.error('Redis retry limit reached — disabling Redis');
        return null; // Stop retrying
      }
      const delay = Math.min(times * 200, 2000);
      logger.warn(`Redis reconnecting in ${delay}ms (attempt ${times})`);
      return delay;
    },
    enableOfflineQueue: false,
    lazyConnect: true,
    connectTimeout: 5000,
    maxRetriesPerRequest: 0, // Disable automatic retries per request to avoid unhandled rejections
  });

  client.on('connect', () => logger.info('✅ Redis connected'));
  client.on('ready', () => logger.info('✅ Redis ready'));
  client.on('error', (err) => {
    // Only log if not already disabling
    if (client.status !== 'end') {
      logger.error('Redis error', { error: err.message });
    }
  });
  client.on('close', () => logger.warn('Redis connection closed'));
  client.on('reconnecting', () => logger.info('Redis reconnecting...'));

  return client;
};

export const redis = createRedisClient();

export const connectRedis = async (): Promise<boolean> => {
  // If Redis is not configured (e.g. localhost in prod) or fails, we just don't use it.
  if (env.NODE_ENV === 'production' && (env.REDIS_HOST === 'localhost' || !env.REDIS_HOST)) {
    logger.warn('Skipping Redis connection in Production (Host not configured correctly)');
    return false;
  }

  try {
    // Only attempt connection if not already connecting/connected
    if (redis.status === 'wait') {
      await redis.connect().catch((err) => {
        logger.warn('Redis initial connection failed (Ignored)', { error: err.message });
      });
    }

    // Check if we are connected
    if (redis.status === 'ready' || redis.status === 'connect') {
      await redis.ping();
      return true;
    }
    return false;
  } catch (error) {
    logger.warn('⚠️ Redis unavailable — running without cache/token blacklist', {
      error: (error as Error).message,
    });
    return false;
  }
};

export const disconnectRedis = async () => {
  await redis.quit();
  logger.info('Redis disconnected');
};

// ─────────────────────────────────────────────────────────────
// Redis helpers
// ─────────────────────────────────────────────────────────────

/** Store a value with optional TTL (seconds) */
export const redisSet = async (
  key: string,
  value: string,
  ttlSeconds?: number,
): Promise<boolean> => {
  try {
    if (ttlSeconds) {
      await redis.setex(key, ttlSeconds, value);
    } else {
      await redis.set(key, value);
    }
    return true;
  } catch {
    return false;
  }
};

/** Get a value */
export const redisGet = async (key: string): Promise<string | null> => {
  try {
    return await redis.get(key);
  } catch {
    return null;
  }
};

/** Delete a key */
export const redisDel = async (key: string): Promise<boolean> => {
  try {
    await redis.del(key);
    return true;
  } catch {
    return false;
  }
};

/** Check if key exists */
export const redisExists = async (key: string): Promise<boolean> => {
  try {
    const result = await redis.exists(key);
    return result === 1;
  } catch {
    return false;
  }
};

// ─── Token blacklist operations ───────────────────────────────
export const BLACKLIST_PREFIX = 'blacklist:token:';
export const SESSION_PREFIX = 'session:';
export const RATE_LIMIT_PREFIX = 'rl:';

export const blacklistToken = async (jti: string, ttlSeconds: number): Promise<void> => {
  await redisSet(`${BLACKLIST_PREFIX}${jti}`, '1', ttlSeconds);
};

export const isTokenBlacklisted = async (jti: string): Promise<boolean> => {
  return redisExists(`${BLACKLIST_PREFIX}${jti}`);
};
