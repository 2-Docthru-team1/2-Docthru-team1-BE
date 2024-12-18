import { type Feedback, Prisma } from '@prisma/client';
import type { IFeedbackRepository } from '#interfaces/repositories/feedback.repository.interface.js';
import type { BasicOptions, ExtendedPrismaClient } from '#types/common.types.js';
import type { CreateFeedbackDTO, UpdateFeedbackDTO } from '#types/feedback.types.js';

export class FeedbackRepository implements IFeedbackRepository {
  private feedback: ExtendedPrismaClient['feedback'];

  constructor(prismaClient: ExtendedPrismaClient) {
    this.feedback = prismaClient.feedback;
  }

  getCount = async (workId: string): Promise<number> => {
    const count = await this.feedback.count({
      where: { workId },
    });

    return count;
  };

  findMany = async (options: BasicOptions, workId: string): Promise<Feedback[] | null> => {
    const { page, pageSize } = options;

    const feedbacks = await this.feedback.findMany({
      where: { workId },
      orderBy: { createdAt: Prisma.SortOrder.desc },
      skip: (page - 1) * pageSize,
      take: pageSize,
      include: { owner: { select: { name: true, role: true } } },
    });

    return feedbacks;
  };

  findById = async (id: string): Promise<Feedback | null> => {
    const feedback = await this.feedback.findUnique({
      where: { id },
      include: { owner: { select: { name: true, role: true } } },
    });

    return feedback;
  };

  create = async (data: CreateFeedbackDTO): Promise<Feedback> => {
    const feedback = await this.feedback.create({ data });

    return feedback;
  };

  update = async (id: string, data: UpdateFeedbackDTO): Promise<Feedback> => {
    const feedback = await this.feedback.update({ where: { id }, data });

    return feedback;
  };

  delete = async (id: string): Promise<Feedback> => {
    const feedback = await this.feedback.update({ where: { id }, data: { deletedAt: new Date() } });

    return feedback;
  };
}
