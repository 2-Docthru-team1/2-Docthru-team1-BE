import type { IUserService } from '#interfaces/services/user.service.interface.js';
import type { UserRepository } from '#repositories/user.repository.js';
import { NotFound } from '#types/http-error.types.js';
import type { User } from '#types/user.types.js';
import MESSAGES from '#utils/constants/messages.js';

export class UserService implements IUserService {
  constructor(private userRepository: UserRepository) {} // 이 부분에 Repository를 연결합니다.

  // 이 아래로 데이터를 가공하는 코드를 작성합니다.
  // 비즈니스 로직, DB에서 가져온 데이터를 가공하는 코드가 주로 작성됩니다.
  // 여기서 가공된 데이터를 controller로 올려줍니다.
  getUserById = async (id: string): Promise<User | null> => {
    const user = await this.userRepository.findById(id);
    if (!user || user.deletedAt) {
      throw new NotFound(MESSAGES.NOT_FOUND);
    }

    return user;
  };

  getUserByEmail = async (email: string): Promise<User | null> => {
    const user = await this.userRepository.findByEmail(email);
    if (!user || user.deletedAt) {
      throw new NotFound(MESSAGES.NOT_FOUND);
    }

    return user;
  };

  updateUser = async (id: string, data: User): Promise<User> => {
    const user = await this.userRepository.update(id, data);
    if (!user || user.deletedAt) {
      throw new NotFound(MESSAGES.NOT_FOUND);
    }

    return user;
  };

  deleteUser = async (id: string): Promise<User> => {
    const user = await this.userRepository.delete(id);
    if (!user || user.deletedAt) {
      throw new NotFound(MESSAGES.NOT_FOUND);
    }

    return user;
  };
}
