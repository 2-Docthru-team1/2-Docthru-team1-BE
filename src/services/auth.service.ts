import type { IAuthService } from '#interfaces/services/auth.service.interface.js';
import type { UserRepository } from '#repositories/user.repository.js';
import type { CreateUserDTO, User } from '#types/user.types.js';

export class AuthService implements IAuthService {
  constructor(private userRepository: UserRepository) {}

  createUser = async (data: CreateUserDTO): Promise<User> => {
    const user = await this.userRepository.create(data);

    return user;
  };
}
