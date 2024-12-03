import type { IUserService } from '#interfaces/services/user.service.interface.js';
import type { UserRepository } from '#repositories/user.repository.js';
import type { User } from '#types/user.types.js';
import assertExist from '#utils/assertExist.js';

export class UserService implements IUserService {
  constructor(private userRepository: UserRepository) {}

  getUserById = async (id: string): Promise<User | null> => {
    const user = await this.userRepository.findById(id);
    assertExist(user);

    return user;
  };

  getUserByEmail = async (email: string): Promise<User | null> => {
    const user = await this.userRepository.findByEmail(email);
    assertExist(user);

    return user;
  };

  updateUser = async (id: string, data: User): Promise<User> => {
    const user = await this.userRepository.update(id, data);
    assertExist(user);

    return user;
  };

  deleteUser = async (id: string): Promise<User> => {
    const user = await this.userRepository.delete(id);
    assertExist(user);

    return user;
  };
}
