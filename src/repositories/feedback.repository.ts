import { type Feedback, Prisma, type PrismaClient } from '@prisma/client';
import type { IFeedbackRepository } from '#interfaces/repositories/feedback.repository.interface.js';
import type { CreateFeedbackDTO, UpdateFeedbackDTO } from '#types/feedback.types.js';

export class FeedbackRepository implements IFeedbackRepository {
  constructor(private feedback: PrismaClient['feedback']) {}

  getCount = async (): Promise<number> => {
    const count = await this.feedback.count();

    return count;
  };

  findMany = async (options: { orderBy: string; page: number; pageSize: number }): Promise<Feedback[] | null> => {
    const { orderBy, page, pageSize } = options;

    let orderOptions;
    switch (orderBy) {
      case 'oldest':
        orderOptions = { createdAt: Prisma.SortOrder.asc };
        break;
      case 'latest':
      default:
        // NOTE orderBy는 Prisma SortOrder 타입을 사용해야 함
        orderOptions = { createdAt: Prisma.SortOrder.desc };
    }

    const feedbacks = await this.feedback.findMany({ orderBy: orderOptions, skip: (page - 1) * pageSize, take: pageSize });

    return feedbacks;
  };

  findById = async (id: string): Promise<Feedback | null> => {
    const feedback = await this.feedback.findUnique({ where: { id } });

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

  isDeleted = async (id: string): Promise<boolean> => {
    const feedback = await this.feedback.findUnique({ where: { id } });

    return !!feedback?.deletedAt;
  };
}
