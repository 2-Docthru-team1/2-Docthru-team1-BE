import type { Feedback } from '@prisma/client';
import type { IFeedbackService } from '#interfaces/services/feedback.service.interface.js';
import type { FeedbackRepository } from '#repositories/feedback.repository.js';
import type { BasicOptions } from '#types/common.types.js';
import type { CreateFeedbackDTO, UpdateFeedbackDTO } from '#types/feedback.types.js';
import { NotFound } from '#types/http-error.types.js';
import MESSAGES from '#utils/constants/messages.js';

export class FeedbackService implements IFeedbackService {
  constructor(private feedbackRepository: FeedbackRepository) {}

  getFeedbacks = async (options: BasicOptions): Promise<{ totalCount: number; list: Feedback[] | null }> => {
    const totalCount = await this.feedbackRepository.getCount();
    const feedbacks = await this.feedbackRepository.findMany(options);

    return { totalCount, list: feedbacks };
  };

  getFeedbackById = async (id: string): Promise<Feedback | null> => {
    const feedback = await this.feedbackRepository.findById(id);
    if (!feedback) {
      throw new NotFound(MESSAGES.NOT_FOUND);
    }

    return feedback;
  };

  createFeedback = async (feedbackData: CreateFeedbackDTO): Promise<Feedback> => {
    const feedback = await this.feedbackRepository.create(feedbackData);

    return feedback;
  };

  updateFeedback = async (id: string, feedbackData: UpdateFeedbackDTO): Promise<Feedback> => {
    const isExist = !!(await this.feedbackRepository.findById(id));
    if (!isExist) {
      throw new NotFound(MESSAGES.NOT_FOUND);
    }

    const feedback = await this.feedbackRepository.update(id, feedbackData);

    return feedback;
  };

  deleteFeedback = async (id: string): Promise<Feedback> => {
    const feedback = await this.feedbackRepository.delete(id);

    return feedback;
  };
}
