import type { NextFunction, Response } from 'express';
import { expressjwt } from 'express-jwt';
import { jwtSecret } from '#configs/auth.config.js';
import { getStorage } from '#middlewares/asyncLocalStorage.js';
import type { UserService } from '#services/user.service.js';
import type { Request } from '#types/common.types.js';
import assertExist from '#utils/assertExist.js';

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
    const token = req.headers.authorization?.split(' ')[1];

    return await new Promise<void>(resolve => {
      expressjwt({
        secret: jwtSecret,
        algorithms: ['HS256'],
        requestProperty: 'user',
      })(req, res, async err => {
        if (err) {
          next(err);
          return;
        }

        const user = await this.userService.getUserById(req.user!.userId);
        assertExist(user);

        const storage = getStorage();
        storage.userId = req.user!.userId;
        storage.userName = user?.name;
        storage.userRole = user?.role;
        storage.accessToken = token;
        storage.tokenEXP = req.user!.exp;

        next();
        resolve();
      });
    });
  };

  verifyRefreshToken = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];

    return await new Promise<void>(resolve => {
      expressjwt({
        secret: jwtSecret,
        algorithms: ['HS256'],
        requestProperty: 'user',
      })(req, res, async err => {
        if (err) {
          next(err);
          return;
        }

        const user = await this.userService.getUserById(req.user!.userId);
        assertExist(user);

        const storage = getStorage();
        storage.userId = req.user!.userId;
        storage.userName = user?.name;
        storage.userRole = user?.role;
        storage.refreshToken = token;
        storage.tokenEXP = req.user!.exp;

        next();
        resolve();
      });
    });
  };
}
