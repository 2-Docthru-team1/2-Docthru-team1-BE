import type { NextFunction, Request, Response } from 'express';
import { expressjwt } from 'express-jwt';
import { jwtSecret } from '#configs/auth.config.js';
import { getStorage } from '#middlewares/asyncLocalStorage.js';
import type { UserService } from '#services/user.service.js';

export class TokenVerifier {
  constructor(private userService: UserService) {}

  verifyAccessToken = async (req: Request, res: Response, next: NextFunction) => {
    await expressjwt({
      secret: jwtSecret,
      algorithms: ['HS256'],
      requestProperty: 'user',
    })(req, res, next);

    const user = await this.userService.getUserById(req.user!.userId);
    const storage = getStorage();
    storage.userId = req.user!.userId;
    storage.userName = user?.name;
    storage.userRole = user?.role;

    next();
  };

  verifyRefreshToken = async (req: Request, res: Response, next: NextFunction) => {
    await expressjwt({
      secret: jwtSecret,
      algorithms: ['HS256'],
      getToken: req => req.cookies.refreshToken,
      requestProperty: 'user',
    })(req, res, next);

    const user = await this.userService.getUserById(req.user!.userId);
    const storage = getStorage();
    storage.userId = req.user!.userId;
    storage.userName = user?.name;
    storage.userRole = user?.role;

    next();
  };
}
