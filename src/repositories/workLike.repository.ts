import { MonthlyType, type User, type WorkLike } from '@prisma/client';
import type { IWorkLikeRepository } from '#interfaces/repositories/workLike.repository.interface.js';
import type { ExtendedPrismaClient } from '#types/common.types.js';
import type { WorkLikeWithOwner } from '#types/workLike.types.js';
import convertMonthNameToNumber from '#utils/convertMonthNameToNumber.js';

export class WorkLikeRepository implements IWorkLikeRepository {
  private workLike: ExtendedPrismaClient['workLike'];
  constructor(prismaClient: ExtendedPrismaClient) {
    this.workLike = prismaClient.workLike;
  }
  getMonthlyWorkLikes = async (month: MonthlyType): Promise<WorkLikeWithOwner[]> => {
    const numberMonth = convertMonthNameToNumber(month);
    const currentYear = new Date().getFullYear();
    const startDate = new Date(Date.UTC(currentYear, numberMonth - 1, 1));
    const endDate = new Date(Date.UTC(currentYear, numberMonth, 0));
    const workLikes = await this.workLike.findMany({
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
      include: {
        challengeWork: { select: { owner: true } },
      },
    });
    return workLikes;
  };
}
