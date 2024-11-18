import type { CreateUserDTO, User } from '@/src/types/user.types.js';

export interface IAuthService {
  createUser(userData: CreateUserDTO): Promise<User>;
  signIn(email: string, password: string): Promise<{ accessToken: string }>;
}
