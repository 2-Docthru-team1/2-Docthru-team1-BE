import type { NextFunction, Request, Response } from 'express';
import { assert } from 'superstruct';
import type { AuthService } from '#services/auth.service.js';
import type { RequestBody } from '#types/common.types.js';
import type { CreateUserDTO, SignInDTO } from '#types/user.types.js';
import MESSAGES from '#utils/constants/messages.js';
import { CreateUser, SignIn } from '#utils/struct.js';

export class AuthController {
  constructor(private authService: AuthService) {}

  signUp = async (req: RequestBody<CreateUserDTO>, res: Response, next: NextFunction) => {
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

  // 로그인
  signIn = async (req: RequestBody<SignInDTO>, res: Response, next: NextFunction) => {
    assert(req.body, SignIn, MESSAGES.WRONG_FORMAT);
    const { email, password } = req.body;

    // 로그인 서비스 호출 (email, password로 인증)
    const { user, accessToken } = await this.authService.signIn(email, password);

    // 성공 시 사용자 정보와 JWT 토큰 반환
    res.json({ user, accessToken });
  };
}

// 유저인증 - 로그인 회원가입
// 롤(역할)도 보이게
// 리프레시토큰
// 작업시 어디가 급한지 예린님께 체크
// 완료되면 마이페이지
// 로그인 회원가입 토큰 - 3가지
// 로그인 - 재원님 - 일요일 저녁
// 마찬가지 일요일 저녁

// 레시피 리스트
// 레시피 상세 페이지
// 챌린지 보기 페이지
// 완료되면 챌린지 상세 페이지

// 인증, 인가 관련된 것들

// User 인증, 인가
