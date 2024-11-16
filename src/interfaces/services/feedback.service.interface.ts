import type { CreateFeedbackDTO, Feedback, UpdateFeedbackDTO } from '#types/work.types.js';

export interface IFeedbackService {
  getFeedbacks(options: { orderBy: string; page: number; pageSize: number }): Promise<Feedback[] | null>;
  getFeedbackById(id: string): Promise<Feedback | null>;
  createFeedback(FeedbackData: CreateFeedbackDTO): Promise<Feedback>;
  updateFeedback(id: string, FeedbackData: UpdateFeedbackDTO): Promise<Feedback>;
  deleteFeedback(id: string): Promise<Feedback>;
}
