import type { NextFunction, Request, Response } from 'express';
import { logger } from '#utils/log.js';

const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  //NOTE: 유저id를 찍으려면 accessToken 미들웨어 이후에 들어가야됨
  logger.info(`Request Method: ${req.method}, RequestUrl: ${req.url}`);
  res.on('finish', () => {
    logger.info(`Request Status: ${res.statusCode}`);
  });
  next();
};

export default loggerMiddleware;
