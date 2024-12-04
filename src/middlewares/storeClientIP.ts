import type { NextFunction, Request, Response } from 'express';
import { v4 as uuidV4 } from 'uuid';
import { getStorage } from './asyncLocalStorage.js';

export const storeClientIp = (req: Request, res: Response, next: NextFunction) => {
  const storage = getStorage();
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const requestId = uuidV4();
  storage.requestIp = ip;
  storage.requestId = requestId;
  next();
};
