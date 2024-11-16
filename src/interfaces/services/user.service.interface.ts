import type { UpdateUserDTO, User } from '@/src/types/user.types.js';

export interface IUserService {
  getUserById(id: string): Promise<User | null>;
  getUserByEmail(email: string): Promise<User | null>;
  updateUser(id: string, userData: UpdateUserDTO): Promise<User>;
  deleteUser(id: string): Promise<User>;
}
