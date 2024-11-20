import type { NextFunction, Request, Response } from 'express';
import { assert } from 'superstruct';
import MESSAGES from '#utils/constants/messages.js';
import { CreateChallenge } from '#utils/struct.js';

export const validateCreateChallenge = (req: Request, res: Response, next: NextFunction) => {
  assert(req.body, CreateChallenge, MESSAGES.WRONG_FORMAT);
  next();
};

export const validateUpdateChallenge = (req: Request, res: Response, next: NextFunction) => {
  assert(req.body, PatchChallenge, MESSAGES.WRONG_FORMAT);
  next();
};
