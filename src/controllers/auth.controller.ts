import type { NextFunction, Response } from 'express';
import { assert } from 'superstruct';
import type { AuthService } from '#services/auth.service.js';
import type { CreateUserDTO, SignInDTO } from '#types/auth.types.js';
import type { Request } from '#types/common.types.js';
import MESSAGES from '#utils/constants/messages.js';
import sendVerificationMail from '#utils/nodemailer/verification-message.js';
import { CreateUser, SignIn, Uuid } from '#utils/struct.js';

export class AuthController {
  constructor(private authService: AuthService) {}

  signIn = async (req: Request<{ body: SignInDTO }>, res: Response, next: NextFunction) => {
    assert(req.body, SignIn, MESSAGES.WRONG_FORMAT);
    const { email, password } = req.body;

    const user = await this.authService.signIn(email, password);

    res.json(user);
  };

  getMe = async (req: Request, res: Response, next: NextFunction) => {
    const user = await this.authService.getUser(req.user!.userId);

    res.json(user);
  };

  signUp = async (req: Request<{ body: CreateUserDTO }>, res: Response, next: NextFunction) => {
    assert(req.body, CreateUser, MESSAGES.WRONG_FORMAT);
    const user = await this.authService.createUser(req.body);

    sendVerificationMail(user.id, user.email);
    res.json({ message: `입력한 주소의 인증 메일을 확인해주세요.` });
  };

  verifyUser = async (req: Request<{ params: { id: string } }>, res: Response, next: NextFunction) => {
    const { id } = req.params;
    assert(id, Uuid, MESSAGES.WRONG_ID_FORMAT);

    const user = await this.authService.verifyUser(id);

    // res.json(user);
    res.redirect('http://3.39.236.234:3000/signIn');
  };

  refreshToken = async (req: Request, res: Response, next: NextFunction) => {
    const user = await this.authService.getNewToken();

    res.json(user);
  };
}
