import type { IFeedbackRepository } from '#interfaces/repositories/feedback.repository.interface.js';
import type { CreateFeedbackDTO, Feedback, UpdateFeedbackDTO } from '#types/work.types.js';
import type { PrismaClient } from '@prisma/client';

export class FeedbackRepository implements IFeedbackRepository {
  private feedback: PrismaClient['feedback'];
  
  constructor(client: PrismaClient) {
    this.feedback = client.feedback; // 이 부분에 각 모델(스키마)를 연결합니다.
  }

    // 이 아래로 직접 DB와 통신하는 코드를 작성합니다.
  // 여기서 DB와 통신해 받아온 데이터를 위로(service로) 올려줍니다.
  findMany = async (options: { orderBy: string; page: number; pageSize: number }): Promise<Feedback[] | null> => {
    const feedbacks = await this.feedback.findMany();

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
    const feedback = await this.feedback.delete({ where: { id } });

    return feedback;
  };
}
