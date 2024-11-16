import type { CreateUserDTO, User } from '@/src/types/user.types.js';

export interface IAuthService {
  createUser(userData: CreateUserDTO): Promise<User>;
}
