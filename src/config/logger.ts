import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import path from 'path';
import { env, isDev } from './env';

// ─────────────────────────────────────────────────────────────
// Custom log levels
// ─────────────────────────────────────────────────────────────
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'cyan',
};

winston.addColors(colors);

// ─────────────────────────────────────────────────────────────
// Format definitions
// ─────────────────────────────────────────────────────────────
const consoleFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
  winston.format.colorize({ all: true }),
  winston.format.printf(
    ({ timestamp, level, message, ...meta }) =>
      `[${timestamp}] ${level}: ${message}${
        Object.keys(meta).length ? '\n' + JSON.stringify(meta, null, 2) : ''
      }`,
  ),
);

const fileFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
  winston.format.errors({ stack: true }),
  winston.format.json(),
);

// ─────────────────────────────────────────────────────────────
// Transports
// ─────────────────────────────────────────────────────────────
const transports: winston.transport[] = [];

// Console transport — always active in development
if (isDev) {
  transports.push(
    new winston.transports.Console({
      format: consoleFormat,
    }),
  );
} else {
  // In production, log errors to console as JSON for log aggregators
  transports.push(
    new winston.transports.Console({
      level: 'error',
      format: fileFormat,
    }),
  );
}

// Rotating file transports
const logDir = path.resolve(env.LOG_DIR);

transports.push(
  // All logs
  new DailyRotateFile({
    filename: path.join(logDir, 'combined-%DATE%.log'),
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
    format: fileFormat,
    level: 'debug',
  }),
  // Error logs only
  new DailyRotateFile({
    filename: path.join(logDir, 'error-%DATE%.log'),
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '30d',
    format: fileFormat,
    level: 'error',
  }),
  // HTTP access logs
  new DailyRotateFile({
    filename: path.join(logDir, 'access-%DATE%.log'),
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '50m',
    maxFiles: '7d',
    format: fileFormat,
    level: 'http',
  }),
);

// ─────────────────────────────────────────────────────────────
// Logger instance
// ─────────────────────────────────────────────────────────────
export const logger = winston.createLogger({
  level: env.LOG_LEVEL,
  levels,
  transports,
  exitOnError: false,
});

// Stream for Morgan HTTP logging
export const logStream = {
  write: (message: string) => {
    logger.http(message.trim());
  },
};
