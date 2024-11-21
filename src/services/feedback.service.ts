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
    const Feedbacks = await this.feedbackRepository.findMany(options);

    return { totalCount, list: Feedbacks };
  };

  getFeedbackById = async (id: string): Promise<Feedback | null> => {
    const Feedback = await this.feedbackRepository.findById(id);
    if (!Feedback) {
      throw new NotFound(MESSAGES.NOT_FOUND);
    }

    return Feedback;
  };

  createFeedback = async (FeedbackData: CreateFeedbackDTO): Promise<Feedback> => {
    const Feedback = await this.feedbackRepository.create(FeedbackData);

    return Feedback;
  };

  updateFeedback = async (id: string, FeedbackData: UpdateFeedbackDTO): Promise<Feedback> => {
    const isExist = !!(await this.feedbackRepository.findById(id));
    if (!isExist) {
      throw new NotFound(MESSAGES.NOT_FOUND);
    }

    const Feedback = await this.feedbackRepository.update(id, FeedbackData);

    return Feedback;
  };

  deleteFeedback = async (id: string): Promise<Feedback> => {
    const Feedback = await this.feedbackRepository.delete(id);

    return Feedback;
  };
}
