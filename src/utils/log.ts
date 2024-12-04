import type { NextFunction, Request } from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createLogger, format, transports } from 'winston';
import { getStorage } from '#middlewares/asyncLocalStorage.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const logDir = path.join(__dirname, '../logs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const customFormat = format.printf(({ timestamp, level, message, id, ip, stack, request }) => {
  return JSON.stringify({
    timestamp,
    level,
    message,
    ...(request ? { request } : {}),
    ...(stack ? { stack } : {}),
    id,
    ip,
  });
});

export const logger = createLogger({
  level: 'info',
  format: format.combine(format.timestamp(), customFormat),
  transports: [
    new transports.File({
      filename: path.join(__dirname, '../logs/combined.log'),
    }),
  ],
});
export const errorLogger = createLogger({
  level: 'error',
  format: format.combine(format.timestamp(), customFormat),
  transports: [
    new transports.File({
      filename: path.join(__dirname, '../logs/error.log'),
      level: 'error',
    }),
  ],
});

export const logErrorWithRequest = (err: Error, req: Request) => {
  const storage = getStorage();
  const { requestId, requestIp } = storage;
  errorLogger.error({
    message: err.message,
    stack: err.stack,
    request: {
      method: req.method,
      url: req.url,
      headers: req.headers,
      body: req.body,
    },
    id: requestId,
    ip: requestIp,
  });
};
