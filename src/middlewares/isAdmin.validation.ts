import type { NextFunction, Request, Response } from 'express';
import { Forbidden } from '#types/http-error.types.js';
import MESSAGES from '#utils/constants/messages.js';
import { getStorage } from './asyncLocalStorage.js';

export default function validateIsAdmin(req: Request, res: Response, next: NextFunction) {
  const storage = getStorage();
  const userRole = storage.userRole;
  if (userRole !== 'admin') {
    throw new Forbidden(MESSAGES.FORBIDDEN);
  }

  next();
}
