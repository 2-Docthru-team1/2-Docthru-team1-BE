import type { NextFunction, Response } from 'express';
import { assert } from 'superstruct';
import type { AuthService } from '#services/auth.service.js';
import type { Request } from '#types/common.types.js';
import type { CreateUserDTO, SignInDTO } from '#types/user.types.js';
import MESSAGES from '#utils/constants/messages.js';
import { CreateUser, SignIn } from '#utils/struct.js';

export class AuthController {
  constructor(private authService: AuthService) {}

  signIn = async (req: Request<{ body: SignInDTO }>, res: Response, next: NextFunction) => {
    assert(req.body, SignIn, MESSAGES.WRONG_FORMAT);
    const { email, password } = req.body;

    // const { user, accessToken } = await this.authService.signIn(email, password);

    // res.json({ user, accessToken });
  };

  signUp = async (req: Request<{ body: CreateUserDTO }>, res: Response, next: NextFunction) => {
    assert(req.body, CreateUser, MESSAGES.WRONG_FORMAT);
    const user = await this.authService.createUser(req.body);

    res.json(user);
  };

  refreshToken = async (req: Request, res: Response, next: NextFunction) => {
    const { refreshToken } = req.cookies;
    if (refreshToken === undefined) throw new Error(MESSAGES.NO_REFRESH_TOKEN);
    if (!req.user || !req.user.userId) throw new Error(MESSAGES.UNAUTHORIZED);

    const user = await this.authService.getNewToken(req.user, refreshToken);
    if (!user) res.status(404).json();

    res.json(user);
  };
}
