import type { NextFunction, Request, Response } from 'express';
import { logger } from '#utils/log.js';

const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  logger.info(`Request Method: ${req.method}, RequestUrl: ${req.url}`);
  res.on('finish', () => {
    logger.info(`Request Status: ${res.statusCode}`);
  });
  next();
};

export default loggerMiddleware;
