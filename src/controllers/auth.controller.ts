import type { NextFunction, Response } from 'express';
import { assert } from 'superstruct';
import type { AuthService } from '#services/auth.service.js';
import type { RequestBody } from '#types/common.types.js';
import type { CreateUserDTO } from '#types/user.types.js';
import MESSAGES from '#utils/constants/messages.js';
import { CreateUser } from '#utils/struct.js';

export class AuthController {
  constructor(private authService: AuthService) {}

  signUp = async (req: RequestBody<CreateUserDTO>, res: Response, next: NextFunction) => {
    assert(req.body, CreateUser, MESSAGES.WRONG_FORMAT);
    const user = await this.authService.createUser(req.body);

    res.json(user);
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
