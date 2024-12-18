import type { CreateUserDTO } from '#types/auth.types.js';
import type { User } from '#types/user.types.js';

export interface IUserRepository {
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  create(userData: CreateUserDTO): Promise<User>;
  update(id: string, userData: User): Promise<User>;
  delete(id: string): Promise<User>;
}
