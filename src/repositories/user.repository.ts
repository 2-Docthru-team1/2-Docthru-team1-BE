import type { PrismaClient } from '@prisma/client';
import type { IUserRepository } from '#interfaces/repositories/user.repository.interface.js';
import type { CreateUserDTO, UpdateUserDTO, User } from '#types/user.types.js';

export class UserRepository implements IUserRepository {
  constructor(private user: PrismaClient['user']) {}

  findById = async (id: string): Promise<User | null> => {
    const user = await this.user.findUnique({ where: { id } });

    return user;
  };

  findByEmail = async (email: string): Promise<User | null> => {
    const user = await this.user.findUnique({ where: { email } });
    return user as User | null; // 타입 매핑
  };

  create = async (data: CreateUserDTO): Promise<User> => {
    const user = await this.user.create({ data });

    return user;
  };

  update = async (id: string, data: UpdateUserDTO): Promise<User> => {
    const user = await this.user.update({ where: { id }, data });

    return user;
  };

  delete = async (id: string): Promise<User> => {
    const user = await this.user.delete({ where: { id } });

    return user;
  };
}
