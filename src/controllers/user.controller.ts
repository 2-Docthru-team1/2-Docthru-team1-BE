import type { NextFunction, Request, Response } from 'express';
import { assert } from 'superstruct';
import type { UserService } from '#services/user.service.js';
import MESSAGES from '#utils/constants/messages.js';
import { Email, PatchUser, Uuid } from '#utils/struct.js';

export class UserController {
  constructor(private userService: UserService) {} // 이 부분에서 service에 연결합니다.

  // 여기서 api로써 통신합니다.
  // 요청을 받아오는 부분이자, 응답을 전달하는 부분입니다.
  // 받아온 요청을 분해해서 service에서 요구하는 형식에 맞게 수정해줍니다.
  // 요청의 유효성 검사는 middleware를 작성해 route단에서 하는 것이 좋습니다.
  // 간단한 유효성 검사라면 이곳에 작성해도 됩니다.
  // 응답의 status를 지정하고, body를 전달합니다.
  getUserById = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    assert(id, Uuid, MESSAGES.WRONG_ID_FORMAT);

    const user = await this.userService.getUserById(id);

    res.json(user);
  };

  getUserByEmail = async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;
    assert(email, Email, MESSAGES.WRONG_EMAIL_FORMAT);

    const user = await this.userService.getUserByEmail(email);

    res.json(user);
  };

  patchUser = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    assert(req.body, PatchUser, MESSAGES.WRONG_FORMAT);

    // const user = await this.userService.updateUser(id, new User(req.body));

    // res.json(user);
  };

  deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const user = await this.userService.deleteUser(id);

    res.json(user);
  };
}

// user에 관한 것들

// User
// Auth랑 같이

// 재원님
// 김태영

// 유저인증 - 로그인 회원가입
// 롤(역할)도 보이게
// 리프레시토큰
// 작업시 어디가 급한지 예린님께 체크
// 완료되면 마이페이지
// 로그인 회원가입 토큰 - 3가지

// 레시피 리스트 / 상세 - 2가지
// 챌린지 리스트 / 상세 - 2가지
// 레시피 리스트
// 레시피 상세 페이지
// 챌린지 보기 페이지
// 완료되면 챌린지 상세 페이지
