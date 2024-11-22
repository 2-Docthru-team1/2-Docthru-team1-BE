import type { Feedback } from '@prisma/client';
import type { IFeedbackService } from '#interfaces/services/feedback.service.interface.js';
import type { FeedbackRepository } from '#repositories/feedback.repository.js';
import type { BasicOptions } from '#types/common.types.js';
import type { CreateFeedbackDTO, UpdateFeedbackDTO } from '#types/feedback.types.js';
import { BadRequest, NotFound } from '#types/http-error.types.js';
import MESSAGES from '#utils/constants/messages.js';

export class FeedbackService implements IFeedbackService {
  constructor(private feedbackRepository: FeedbackRepository) {}

  getFeedbacks = async (options: BasicOptions, userId?: string): Promise<{ totalCount: number; list: Feedback[] | null }> => {
    let totalCount: number;
    let feedbacks: Feedback[] | null;
    if (userId) {
      totalCount = await this.feedbackRepository.getCount(userId);
      feedbacks = await this.feedbackRepository.findMany(options, userId);
    } else {
      totalCount = await this.feedbackRepository.getCount();
      feedbacks = await this.feedbackRepository.findMany(options);
    }

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
    // NOTE 피드백 삭제 여부 확인
    const isDeleted = await this.feedbackRepository.isDeleted(id);
    if (isDeleted) {
      throw new BadRequest(MESSAGES.DELETED_RESOURCE);
    }

    const feedback = await this.feedbackRepository.update(id, feedbackData);

    return feedback;
  };

  deleteFeedback = async (id: string): Promise<Feedback> => {
    const isExist = !!(await this.feedbackRepository.findById(id));
    if (!isExist) {
      throw new NotFound(MESSAGES.NOT_FOUND);
    }

    const feedback = await this.feedbackRepository.delete(id);

    return feedback;
  };
}
