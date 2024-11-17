import type { PrismaClient } from '@prisma/client';
import type { IUserRepository } from '#interfaces/repositories/user.repository.interface.js';
import type { CreateUserDTO, UpdateUserDTO, User } from '#types/user.types.js';

export class UserRepository implements IUserRepository {
  constructor(private user: PrismaClient['user']) {}

<<<<<<< HEAD
=======
  // 이 아래로 직접 DB와 통신하는 코드를 작성합니다.
  // 여기서 DB와 통신해 받아온 데이터를 위로(service로) 올려줍니다.
>>>>>>> f2265c9 (✨ Feat: 로그인 기능 개발중)
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
