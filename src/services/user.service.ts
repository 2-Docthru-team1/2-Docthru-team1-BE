import type { MonthlyType } from '@prisma/client';
import type { IUserService } from '#interfaces/services/user.service.interface.js';
import type { UserRepository } from '#repositories/user.repository.js';
import type { WorkLikeRepository } from '#repositories/workLike.repository.js';
import { NotFound } from '#types/http-error.types.js';
import type { User } from '#types/user.types.js';
import type { LikedUserRanking, WorkLikeWithOwner } from '#types/workLike.types.js';
import MESSAGES from '#utils/constants/messages.js';

export class UserService implements IUserService {
  constructor(
    private userRepository: UserRepository,
    private workLikeRepository: WorkLikeRepository,
  ) {
    this.userRepository = userRepository;
    this.workLikeRepository = workLikeRepository;
  }

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

  getTopUsersByLikeCount = async (month: MonthlyType): Promise<LikedUserRanking[]> => {
    const monthlyWorkLikes = await this.workLikeRepository.getMonthlyWorkLikes(month);

    const likeCounts: Record<string, { owner: { id: string; name: string; role: string }; likeCount: number }> = {};

    monthlyWorkLikes.forEach((workLike: WorkLikeWithOwner) => {
      const owner = workLike.challengeWork!.owner;
      if (owner) {
        if (!likeCounts[owner.id]) {
          likeCounts[owner.id] = {
            owner: {
              id: owner.id,
              name: owner.name,
              role: owner.role,
            },
            likeCount: 1, // 초기화 시 좋아요 수를 1로 설정
          };
        } else {
          likeCounts[owner.id].likeCount += 1; // 좋아요 수 증가
        }
      }
    });

    // 결과를 배열로 변환하고 정렬
    const sortedLikes = Object.values(likeCounts).sort((a, b) => b.likeCount - a.likeCount);

    return sortedLikes.slice(0, 3); // 집계된 결과 반환
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
