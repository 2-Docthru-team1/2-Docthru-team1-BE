import type { NextFunction, Response } from 'express';
import { assert } from 'superstruct';
import type { AuthService } from '#services/auth.service.js';
import type { CreateUserDTO, SignInDTO } from '#types/auth.types.js';
import type { Request } from '#types/common.types.js';
import { BadRequest, NotFound, Unauthorized } from '#types/http-error.types.js';
import MESSAGES from '#utils/constants/messages.js';
import sendVerificationMail from '#utils/nodemailer/verification-message.js';
import { CreateUser, SignIn, Uuid } from '#utils/struct.js';

export class AuthController {
  constructor(private authService: AuthService) {}

  signIn = async (req: Request<{ body: SignInDTO }>, res: Response, next: NextFunction) => {
    assert(req.body, SignIn, MESSAGES.WRONG_FORMAT);
    const { email, password } = req.body;

    const { refreshToken, ...user } = await this.authService.signIn(email, password);

    // res.cookie('refreshToken', refreshToken, {
    //   httpOnly: true,
    //   sameSite: 'lax',
    // });
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      sameSite: 'lax',
      secure: false,
    });

    res.json(user);
  };

  getMe = async (req: Request, res: Response, next: NextFunction) => {
    const user = await this.authService.getUser(req.user!.userId);

    res.json(user);
  };

  signUp = async (req: Request<{ body: CreateUserDTO }>, res: Response, next: NextFunction) => {
    assert(req.body, CreateUser, MESSAGES.WRONG_FORMAT);
    const user = await this.authService.createUser(req.body);

    // sendVerificationMail(user.id);
    sendVerificationMail(user.id, user.email);
    res.json({ message: `입력한 주소의 인증 메일을 확인해주세요.` });
  };

  verifyUser = async (req: Request<{ params: { id: string } }>, res: Response, next: NextFunction) => {
    const { id } = req.params;
    assert(id, Uuid, MESSAGES.WRONG_ID_FORMAT);

    const user = await this.authService.verifyUser(id);

    res.json(user);
  };

  refreshToken = async (req: Request, res: Response, next: NextFunction) => {
    const { refreshToken } = req.cookies;
    if (refreshToken === undefined) {
      throw new BadRequest(MESSAGES.NO_REFRESH_TOKEN);
    }
    if (!req.user || !req.user.userId) {
      throw new Unauthorized(MESSAGES.UNAUTHORIZED);
    }

    const user = await this.authService.getNewToken(req.user, refreshToken);
    if (!user) {
      throw new NotFound(MESSAGES.NOT_FOUND);
    }

    res.json(user);
  };
}
