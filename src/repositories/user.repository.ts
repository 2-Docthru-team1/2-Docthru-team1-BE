import type { IUserRepository } from '#interfaces/repositories/user.repository.interface.js';
import type { CreateUserDTO, UpdateUserDTO } from '#types/auth.types.js';
import type { ExtendedPrismaClient } from '#types/common.types.js';
import type { User } from '#types/user.types.js';

export class UserRepository implements IUserRepository {
  private user: ExtendedPrismaClient['user'];

  constructor(prismaClient: ExtendedPrismaClient) {
    this.user = prismaClient.user;
  }

  findById = async (id: string): Promise<User | null> => {
    const user = await this.user.findUnique({ where: { id } });

    return user;
  };

  findByEmail = async (email: string): Promise<User | null> => {
    const user = await this.user.findUnique({ where: { email } });

    return user;
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
    const user = await this.user.update({ where: { id }, data: { deletedAt: new Date() } });

    return user;
  };
}
