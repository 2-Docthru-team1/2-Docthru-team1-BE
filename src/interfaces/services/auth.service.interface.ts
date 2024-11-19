import type { UserToken } from '#types/auth.types.js';
import type { CreateUserDTO, SafeUser, User } from '@/src/types/user.types.js';

export interface IAuthService {
  signIn(email: string, password: string): Promise<User>;
  createUser(userData: CreateUserDTO): Promise<User>;
  getNewToken(userToken: UserToken, refreshToken: string): Promise<SafeUser>;
}
