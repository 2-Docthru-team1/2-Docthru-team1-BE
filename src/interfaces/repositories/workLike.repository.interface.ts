import type { MonthlyType } from '@prisma/client';
import type { WorkLikeWithOwner } from '#types/workLike.types.js';

export interface IWorkLikeRepository {
  getMonthlyWorkLikes(month: MonthlyType): Promise<WorkLikeWithOwner[]>;
}
