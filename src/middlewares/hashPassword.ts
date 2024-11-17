import crypto from 'crypto';
import type { NextFunction, Request, Response } from 'express';
import hashingPassword from '#utils/hashingPassword.js';

export default function hashPassword(req: Request, res: Response, next: NextFunction) {
  if (!req.body.password) next();

  const salt = crypto.randomBytes(16).toString('hex');
  const hash = hashingPassword(req.body.password, salt);

  req.body.password = hash;
  req.body.salt = salt;

  next();
}
