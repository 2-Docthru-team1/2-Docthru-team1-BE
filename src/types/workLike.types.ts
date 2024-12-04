import type { Role, User, WorkLike } from '@prisma/client';

export interface WorkLikeWithOwner extends WorkLike {
  challengeWork?: {
    owner: User | null;
  };
}
export interface LikedUserRanking {
  owner: {
    id: string;
    name: string;
    role: string | Role;
  };
  likeCount: number;
}
