import type { NextFunction, Request, Response } from 'express';
import { expressjwt } from 'express-jwt';
import { jwtSecret } from '#configs/auth.config.js';

export const verifyAccessToken = async (req: Request, res: Response, next: NextFunction) => {
  await expressjwt({
    secret: jwtSecret,
    algorithms: ['HS256'],
    requestProperty: 'user',
  })(req, res, () => {});

  next();
};

export const verifyRefreshToken = async (req: Request, res: Response, next: NextFunction) => {
  await expressjwt({
    secret: jwtSecret,
    algorithms: ['HS256'],
    getToken: req => req.cookies.refreshToken,
    requestProperty: 'user',
  })(req, res, () => {});

  next();
};
