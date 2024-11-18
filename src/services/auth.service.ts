import type { IAuthService } from '#interfaces/services/auth.service.interface.js';
import type { UserRepository } from '#repositories/user.repository.js';
import type { CreateUserDTO, User } from '#types/user.types.js';
import MESSAGES from '#utils/constants/messages.js';
import hashingPassword from '#utils/hashingPassword.js';
import { generateAccessToken } from '#utils/jwt.js';

export class AuthService implements IAuthService {
  constructor(private userRepository: UserRepository) {}

  createUser = async (data: CreateUserDTO): Promise<User> => {
    const user = await this.userRepository.create(data);

    return user;
  };

  signIn = async (email: string, password: string): Promise<{ user: User; accessToken: string }> => {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new Error(MESSAGES.INVALID_CREDENTIALS);
    }
    const hashedInputPassword = hashingPassword(password, user.salt);
    if (hashedInputPassword !== user.password) {
      throw new Error(MESSAGES.INVALID_CREDENTIALS);
    }

    const accessToken = generateAccessToken(user);
    return { user, accessToken };
  };
}
