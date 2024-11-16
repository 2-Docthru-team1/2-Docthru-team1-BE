import type { CreateFeedbackDTO, Feedback, UpdateFeedbackDTO } from '#types/work.types.js';

export interface IFeedbackRepository {
  findMany(options: { orderBy: string; page: number; pageSize: number }): Promise<Feedback[] | null>;
  findById(id: string): Promise<Feedback | null>;
  create(FeedbackData: CreateFeedbackDTO): Promise<Feedback>;
  update(id: string, FeedbackData: UpdateFeedbackDTO): Promise<Feedback>;
  delete(id: string): Promise<Feedback>;
}
