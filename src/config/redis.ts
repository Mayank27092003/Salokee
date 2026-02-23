import Redis from 'ioredis';
import axios from 'axios';
import { env, isProd } from './env';
import { logger } from './logger';

// ─────────────────────────────────────────────────────────────
// Redis Client Stability Layer
// Since Render free tier often lacks Redis, we use an "Air Gap"
// strategy to prevent connection attempts and async crashes.
// We also support Upstash REST fallback for token blacklisting.
// ─────────────────────────────────────────────────────────────

// Determine if we should even try to use TCP Redis
const shouldSkipTCP = isProd &&
  (env.REDIS_HOST === 'localhost' || !env.REDIS_HOST || env.REDIS_HOST.includes('127.0.0.1'));

let isRedisTCPActive = !shouldSkipTCP;
let isRedisRESTActive = !!(env.UPSTASH_REDIS_REST_URL && env.UPSTASH_REDIS_REST_TOKEN);

const createRedisClient = () => {
  if (!isRedisTCPActive) return null;

  const client = new Redis({
    host: env.REDIS_HOST,
    port: env.REDIS_PORT,
    password: env.REDIS_PASSWORD || undefined,
    db: env.REDIS_DB,
    tls: env.REDIS_TLS ? {} : undefined,
    retryStrategy: (times) => {
      if (times > 2) {
        logger.error('Redis TCP retry limit reached — disabling TCP module');
        isRedisTCPActive = false;
        return null; // Stop retrying
      }
      return Math.min(times * 500, 2000);
    },
    enableOfflineQueue: false,
    lazyConnect: true,
    connectTimeout: 5000,
    maxRetriesPerRequest: 0,
  });

  client.on('connect', () => logger.info('✅ Redis TCP connected'));
  client.on('error', (err) => {
    if (isRedisTCPActive) {
      logger.warn('Redis TCP connection error (Non-fatal)', { error: err.message });
    }
  });

  return client;
};

export const redis = createRedisClient();

export const connectRedis = async (): Promise<boolean> => {
  if (isRedisRESTActive) {
    logger.info('✅ Redis REST (Upstash) configured — using as safety fallback');
  }

  if (!isRedisTCPActive || !redis) {
    logger.warn('⚠️  Redis TCP skipped — running in standalone/REST mode');
    return isRedisRESTActive;
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
    isRedisTCPActive = false;
    logger.warn('⚠️  Redis TCP failed to initialize — falling back to standalone/REST', {
      error: (error as Error).message,
    });
    return isRedisRESTActive;
  }
};

export const disconnectRedis = async () => {
  if (redis) await redis.quit();
};

// ─────────────────────────────────────────────────────────────
// REST Fallback (Upstash)
// ─────────────────────────────────────────────────────────────

const upstashREST = async (command: string[]) => {
  if (!isRedisRESTActive) return null;
  try {
    const response = await axios.post(
      env.UPSTASH_REDIS_REST_URL!,
      command,
      {
        headers: { Authorization: `Bearer ${env.UPSTASH_REDIS_REST_TOKEN}` }
      }
    );
    return response.data.result;
  } catch (error) {
    logger.error('Upstash REST Error', { error: (error as Error).message });
    return null;
  }
};

// ─────────────────────────────────────────────────────────────
// Safe Redis Helpers
// ─────────────────────────────────────────────────────────────

export const redisSet = async (key: string, value: string, ttl?: number): Promise<boolean> => {
  // Try TCP first
  if (isRedisTCPActive && redis && (redis.status === 'ready' || redis.status === 'connect')) {
    try {
      if (ttl) await redis.setex(key, ttl, value);
      else await redis.set(key, value);
      return true;
    } catch { /* falling back */ }
  }

  // Fallback to REST
  if (isRedisRESTActive) {
    const cmd = ttl ? ['SET', key, value, 'EX', String(ttl)] : ['SET', key, value];
    const res = await upstashREST(cmd);
    return res === 'OK';
  }

  return false;
};

export const redisGet = async (key: string): Promise<string | null> => {
  if (isRedisTCPActive && redis && (redis.status === 'ready' || redis.status === 'connect')) {
    try { return await redis.get(key); } catch { /* falling back */ }
  }

  if (isRedisRESTActive) {
    return await upstashREST(['GET', key]);
  }

  return null;
};

export const redisDel = async (key: string): Promise<boolean> => {
  if (isRedisTCPActive && redis && (redis.status === 'ready' || redis.status === 'connect')) {
    try { await redis.del(key); return true; } catch { /* falling back */ }
  }

  if (isRedisRESTActive) {
    const res = await upstashREST(['DEL', key]);
    return res > 0;
  }

  return false;
};

export const redisExists = async (key: string): Promise<boolean> => {
  if (isRedisTCPActive && redis && (redis.status === 'ready' || redis.status === 'connect')) {
    try { return (await redis.exists(key)) === 1; } catch { /* falling back */ }
  }

  if (isRedisRESTActive) {
    const res = await upstashREST(['EXISTS', key]);
    return res === 1;
  }

  return false;
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

export const getRedisStatus = async () => {
  const status: {
    tcp: 'connected' | 'disconnected' | 'skipped';
    rest: 'active' | 'inactive';
    overall: 'healthy' | 'degraded' | 'down';
  } = {
    tcp: isRedisTCPActive ? (redis?.status === 'ready' ? 'connected' : 'disconnected') : 'skipped',
    rest: isRedisRESTActive ? 'active' : 'inactive',
    overall: 'down'
  };

  if (status.tcp === 'connected') status.overall = 'healthy';
  else if (status.rest === 'active') status.overall = 'healthy'; // REST is enough to be healthy
  else if (status.tcp === 'skipped' && status.rest === 'inactive') status.overall = 'degraded';

  return status;
};
