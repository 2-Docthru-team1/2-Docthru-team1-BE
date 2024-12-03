import type { NextFunction, Request, Response } from 'express';
import { assert } from 'superstruct';
import type { UserService } from '#services/user.service.js';
import MESSAGES from '#utils/constants/messages.js';
import { Email, PatchUser, Uuid } from '#utils/struct.js';

export class UserController {
  constructor(private userService: UserService) {}

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
    assert(id, Uuid, MESSAGES.WRONG_ID_FORMAT);

    assert(req.body, PatchUser, MESSAGES.WRONG_FORMAT);

    // const user = await this.userService.updateUser(id, new User(req.body));

    // res.json(user);
  };

  deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    assert(id, Uuid, MESSAGES.WRONG_ID_FORMAT);

    const user = await this.userService.deleteUser(id);

    res.json(user);
  };
}
