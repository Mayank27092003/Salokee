import { z } from 'zod';

// ─────────────────────────────────────────────────────────────
// Strict environment schema — app won't start if invalid
// ─────────────────────────────────────────────────────────────

const envSchema = z.object({
  // App
  NODE_ENV: z.enum(['development', 'test', 'staging', 'production']).default('development'),
  PORT: z.string().default('5000').transform(Number),
  API_VERSION: z.string().default('v1'),
  APP_NAME: z.string().default('Salon Booking Platform'),
  CLIENT_URL: z.string().url(),
  API_URL: z.string().url(),

  // Database
  DATABASE_URL: z.string().min(1, 'DATABASE_URL is required'),

  // Redis
  REDIS_HOST: z.string().default('localhost'),
  REDIS_PORT: z.string().default('6379').transform(Number),
  REDIS_PASSWORD: z.string().optional(),
  REDIS_DB: z.string().default('0').transform(Number),
  REDIS_TLS: z.string().default('false').transform((v) => v === 'true'),
  UPSTASH_REDIS_REST_URL: z.string().url().optional(),
  UPSTASH_REDIS_REST_TOKEN: z.string().optional(),

  // JWT
  JWT_ACCESS_SECRET: z.string().min(32, 'JWT_ACCESS_SECRET must be at least 32 characters'),
  JWT_REFRESH_SECRET: z.string().min(32, 'JWT_REFRESH_SECRET must be at least 32 characters'),
  JWT_ACCESS_EXPIRES_IN: z.string().default('15m'),
  JWT_REFRESH_EXPIRES_IN: z.string().default('7d'),
  JWT_ISSUER: z.string().default('salon-booking-platform'),

  // Security
  BCRYPT_ROUNDS: z.string().default('12').transform(Number),
  MAX_LOGIN_ATTEMPTS: z.string().default('5').transform(Number),
  LOCK_TIME_MINUTES: z.string().default('15').transform(Number),
  RATE_LIMIT_WINDOW_MS: z.string().default('900000').transform(Number),
  RATE_LIMIT_MAX: z.string().default('100').transform(Number),
  AUTH_RATE_LIMIT_MAX: z.string().default('10').transform(Number),

  // Email (optional in development — app logs emails to console instead)
  SMTP_HOST: z.string().default('smtp.gmail.com'),
  SMTP_PORT: z.string().default('587').transform(Number),
  SMTP_SECURE: z.string().default('false').transform((v) => v === 'true'),
  SMTP_USER: z.string().optional().default(''),
  SMTP_PASS: z.string().optional().default(''),
  EMAIL_FROM_NAME: z.string().default('Salon Platform'),
  EMAIL_FROM_ADDRESS: z.string().email().default('noreply@salonplatform.com'),

  // CORS
  CORS_ORIGINS: z.string().default('http://localhost:3000'),

  // Cookie
  COOKIE_SECRET: z.string().min(32, 'COOKIE_SECRET must be at least 32 characters'),
  COOKIE_DOMAIN: z.string().default('localhost'),
  COOKIE_SECURE: z.string().default('false').transform((v) => v === 'true'),

  // Logging
  LOG_LEVEL: z.enum(['error', 'warn', 'info', 'debug', 'verbose']).default('debug'),
  LOG_DIR: z.string().default('./logs'),
});

// Parse and validate — crash immediately on bad config
const parseResult = envSchema.safeParse(process.env);

if (!parseResult.success) {
  // Use synchronous blocking write to ensure Render captures this before exit 1
  require('fs').writeFileSync(1, '\n\n❌ FATAL: ENVIRONMENT VALIDATION FAILED ❌\n');
  require('fs').writeFileSync(1, JSON.stringify(parseResult.error.format(), null, 2) + '\n\n');
  process.exit(1);
}

export const env = parseResult.data;

export const isDev = env.NODE_ENV === 'development';
export const isProd = env.NODE_ENV === 'production';
export const isTest = env.NODE_ENV === 'test';

export const corsOrigins = env.CORS_ORIGINS.split(',').map((o: string) => o.trim());
