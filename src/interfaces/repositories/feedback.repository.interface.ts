import type { Feedback } from '@prisma/client';
import type { CreateFeedbackDTO, UpdateFeedbackDTO } from '#types/feedback.types.js';

export interface IFeedbackRepository {
  getCount(): Promise<number>;
  findMany(options: { orderBy: string; page: number; pageSize: number }): Promise<Feedback[] | null>;
  findById(id: string): Promise<Feedback | null>;
  create(FeedbackData: CreateFeedbackDTO): Promise<Feedback>;
  update(id: string, FeedbackData: UpdateFeedbackDTO): Promise<Feedback>;
  delete(id: string): Promise<Feedback>;
}
