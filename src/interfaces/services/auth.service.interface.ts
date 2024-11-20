import type { CreateUserDTO, SigninResponse, UserToken } from '#types/auth.types.js';
import type { SafeUser } from '#types/user.types.js';

export interface IAuthService {
  signIn(email: string, password: string): Promise<SigninResponse>;
  getUser(userId: string): Promise<SafeUser>;
  createUser(userData: CreateUserDTO): Promise<SafeUser>;
  getNewToken(userToken: UserToken, refreshToken: string): Promise<SafeUser>;
}
