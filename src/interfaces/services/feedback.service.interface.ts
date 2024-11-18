import type { Feedback } from '@prisma/client';
import type { CreateFeedbackDTO, UpdateFeedbackDTO } from '#types/feedback.types.js';

export interface IFeedbackService {
  getFeedbacks(options: { orderBy: string; page: number; pageSize: number }): Promise<Feedback[] | null>;
  getFeedbackById(id: string): Promise<Feedback | null>;
  createFeedback(FeedbackData: CreateFeedbackDTO): Promise<Feedback>;
  updateFeedback(id: string, FeedbackData: UpdateFeedbackDTO): Promise<Feedback>;
  deleteFeedback(id: string): Promise<Feedback>;
}
