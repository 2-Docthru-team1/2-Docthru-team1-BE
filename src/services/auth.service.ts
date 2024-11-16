import type { IAuthService } from '#interfaces/services/auth.service.interface.js';
import type { UserRepository } from '#repositories/user.repository.js';
import type { CreateUserDTO, User } from '#types/user.types.js';

export class AuthService implements IAuthService {
  constructor(private userRepository: UserRepository) {} // 이 부분에 Repository를 연결합니다.

  // 이 아래로 데이터를 가공하는 코드를 작성합니다.
  // 비즈니스 로직, DB에서 가져온 데이터를 가공하는 코드가 주로 작성됩니다.
  // 여기서 가공된 데이터를 controller로 올려줍니다.
  createUser = async (data: CreateUserDTO): Promise<User> => {
    const user = await this.userRepository.create(data);

    return user;
  };
}
