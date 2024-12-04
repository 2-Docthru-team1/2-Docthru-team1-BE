import type { NextFunction, Request, Response } from 'express';
import { logger } from '#utils/log.js';
import { getStorage } from './asyncLocalStorage.js';

const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const storage = getStorage();
  const { requestId, requestIp } = storage;
  logger.info({
    message: `Request Method: ${req.method}, RequestUrl: ${req.url}`,
    id: requestId,
    ip: requestIp,
  });

  res.on('finish', () => {
    logger.info({
      message: `Request Status: ${res.statusCode}`,
      id: requestId,
      ip: requestIp,
    });
  });
  next();
};

export default loggerMiddleware;
