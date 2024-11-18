import type { IAuthService } from '#interfaces/services/auth.service.interface.js';
import type { UserRepository } from '#repositories/user.repository.js';
import type { UserToken } from '#types/auth.types.js';
import type { CreateUserDTO, User } from '#types/user.types.js';
import MESSAGES from '#utils/constants/messages.js';
import createToken from '#utils/createToken.js';
import filterSensitiveData from '#utils/filterSensitiveData.js';
import hashingPassword from '#utils/hashingPassword.js';
import { generateAccessToken } from '#utils/jwt.js';
import remainingTime from '#utils/remainingTime.js';

export class AuthService implements IAuthService {
  constructor(private userRepository: UserRepository) {}

  createUser = async (data: CreateUserDTO): Promise<User> => {
    const user = await this.userRepository.create(data);

    return user;
  };

  getNewToken = async (userToken: UserToken, refreshToken: string) => {
    const user = await this.userRepository.findById(userToken.userId);
    if (!user) throw new Error(MESSAGES.BAD_REQUEST);
    if (user.refreshToken !== refreshToken) throw new Error(MESSAGES.UNAUTHORIZED);

    // NOTE 리프레시 토큰의 남은 시간이 2시간 이내일경우
    const timeRemaining = remainingTime(userToken.exp);
    if (timeRemaining < 3600 * 2) {
      // NOTE 새 리프레시 토큰을 발급하고 이를 업데이트
      const refreshToken = createToken(user, 'refresh');
      user.refreshToken = refreshToken;
      await this.userRepository.update(user.id, user);
    }

    const accessToken = createToken(user, 'access');
    user.accessToken = accessToken;

    return filterSensitiveData(user);
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
