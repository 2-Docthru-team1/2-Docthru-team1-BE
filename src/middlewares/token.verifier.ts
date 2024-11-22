import type { NextFunction, Response } from 'express';
import { expressjwt } from 'express-jwt';
import { jwtSecret } from '#configs/auth.config.js';
import { getStorage } from '#middlewares/asyncLocalStorage.js';
import type { UserService } from '#services/user.service.js';
import type { Request } from '#types/common.types.js';

export class TokenVerifier {
  constructor(private userService: UserService) {}

  optionalVerifyAccessToken = async (req: Request, res: Response, next: NextFunction) => {
    const authorizationHeader = req.headers.authorization;

    if (authorizationHeader) {
      await this.verifyAccessToken(req, res, next);

      return;
    }

    next();
  };

  verifyAccessToken = async (req: Request, res: Response, next: NextFunction) => {
    return await new Promise(resolve => {
      expressjwt({
        secret: jwtSecret,
        algorithms: ['HS256'],
        requestProperty: 'user',
      })(req, res, async err => {
        if (err) {
          return;
        }

        const user = await this.userService.getUserById(req.user!.userId);
        const storage = getStorage();
        storage.userId = req.user!.userId;
        storage.userName = user?.name;
        storage.userRole = user?.role;

        next();
        resolve(null);
      });
    });
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
