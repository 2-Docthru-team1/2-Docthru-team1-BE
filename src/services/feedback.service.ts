import type { Feedback } from '@prisma/client';
import type { IFeedbackService } from '#interfaces/services/feedback.service.interface.js';
import type { FeedbackRepository } from '#repositories/feedback.repository.js';
import type { CreateFeedbackDTO, UpdateFeedbackDTO } from '#types/feedback.types.js';

export class FeedbackService implements IFeedbackService {
  constructor(private feedbackRepository: FeedbackRepository) {}

  getFeedbacks = async (options: {
    orderBy: string;
    page: number;
    pageSize: number;
  }): Promise<{ totalCount: number; list: Feedback[] | null }> => {
    const totalCount = await this.feedbackRepository.getCount();
    const Feedbacks = await this.feedbackRepository.findMany(options);

    return { totalCount, list: Feedbacks };
  };

  getFeedbackById = async (id: string): Promise<Feedback | null> => {
    const Feedback = await this.feedbackRepository.findById(id);

    return Feedback;
  };

  createFeedback = async (FeedbackData: CreateFeedbackDTO): Promise<Feedback> => {
    const Feedback = await this.feedbackRepository.create(FeedbackData);

    return Feedback;
  };

  updateFeedback = async (id: string, FeedbackData: UpdateFeedbackDTO): Promise<Feedback> => {
    const Feedback = await this.feedbackRepository.update(id, FeedbackData);
    return Feedback;
  };

  deleteFeedback = async (id: string): Promise<Feedback> => {
    const Feedback = await this.feedbackRepository.delete(id);

    return Feedback;
  };
}
