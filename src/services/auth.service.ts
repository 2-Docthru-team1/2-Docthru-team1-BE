import type { IAuthService } from '#interfaces/services/auth.service.interface.js';
import type { UserRepository } from '#repositories/user.repository.js';
import type { CreateUserDTO, SigninResponse, UserToken } from '#types/auth.types.js';
import { BadRequest, NotFound, Unauthorized } from '#types/http-error.types.js';
import type { SafeUser } from '#types/user.types.js';
import MESSAGES from '#utils/constants/messages.js';
import createToken from '#utils/createToken.js';
import filterSensitiveData from '#utils/filterSensitiveData.js';
import hashingPassword from '#utils/hashingPassword.js';
import remainingTime from '#utils/remainingTime.js';

export class AuthService implements IAuthService {
  constructor(private userRepository: UserRepository) {}

  signIn = async (email: string, password: string): Promise<SigninResponse> => {
    const user = await this.userRepository.findByEmail(email);
    if (!user || user.deletedAt) {
      throw new NotFound(MESSAGES.INVALID_CREDENTIALS);
    }

    const hashedInputPassword = hashingPassword(password, user.salt);
    if (hashedInputPassword !== user.password) {
      throw new NotFound(MESSAGES.INVALID_CREDENTIALS);
    }

    const refreshToken = createToken(user, 'refresh');
    user.refreshToken = refreshToken;
    await this.userRepository.update(user.id, user);

    const accessToken = createToken(user, 'access');
    user.accessToken = accessToken;
    return { ...filterSensitiveData(user), refreshToken };
  };

  getUser = async (userId: string): Promise<SafeUser> => {
    const user = await this.userRepository.findById(userId);
    if (!user || user.deletedAt) {
      throw new NotFound(MESSAGES.NOT_FOUND);
    }

    return filterSensitiveData(user);
  };

  createUser = async (data: CreateUserDTO): Promise<SafeUser> => {
    const target = await this.userRepository.findByEmail(data.email);
    if (target) {
      throw new BadRequest(MESSAGES.USER_EXISTS);
    }

    const user = await this.userRepository.create(data);

    return filterSensitiveData(user);
  };

  verifyUser = async (id: string) => {
    const target = await this.userRepository.findById(id);
    if (!target || target.deletedAt) {
      throw new NotFound(MESSAGES.NOT_FOUND);
    }

    const user = await this.userRepository.update(id, { isVerified: true });

    return filterSensitiveData(user);
  };

  getNewToken = async (userToken: UserToken, refreshToken: string): Promise<SafeUser> => {
    const user = await this.userRepository.findById(userToken.userId);
    if (!user || user.deletedAt) {
      throw new BadRequest(MESSAGES.INVALID_ACCESS_TOKEN);
    }
    if (user.refreshToken !== refreshToken) {
      throw new Unauthorized(MESSAGES.INVALID_REFRESH_TOKEN);
    }

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
}
