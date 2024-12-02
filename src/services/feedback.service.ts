import type { Feedback } from '@prisma/client';
import type { IFeedbackService } from '#interfaces/services/feedback.service.interface.js';
import { getStorage } from '#middlewares/asyncLocalStorage.js';
import type { FeedbackRepository } from '#repositories/feedback.repository.js';
import type { WorkRepository } from '#repositories/work.repository.js';
import type { BasicOptions } from '#types/common.types.js';
import type { CreateFeedbackDTO, UpdateFeedbackDTO } from '#types/feedback.types.js';
import { Forbidden, NotFound } from '#types/http-error.types.js';
import MESSAGES from '#utils/constants/messages.js';

export class FeedbackService implements IFeedbackService {
  constructor(
    private feedbackRepository: FeedbackRepository,
    private workRepository: WorkRepository,
  ) {}

  getFeedbacks = async (options: BasicOptions, workId: string): Promise<{ totalCount: number; list: Feedback[] | null }> => {
    const targetWork = await this.workRepository.findById(workId);
    if (!targetWork || targetWork.deletedAt) {
      throw new NotFound(MESSAGES.WORK_NOT_FOUND);
    }

    const totalCount = await this.feedbackRepository.getCount(workId);
    const feedbacks = await this.feedbackRepository.findMany(options, workId);

    return { totalCount, list: feedbacks };
  };

  getFeedbackById = async (id: string): Promise<Feedback | null> => {
    const feedback = await this.feedbackRepository.findById(id);
    if (!feedback || feedback.deletedAt) {
      throw new NotFound(MESSAGES.NOT_FOUND);
    }

    return feedback;
  };

  createFeedback = async (feedbackData: CreateFeedbackDTO): Promise<Feedback> => {
    const feedback = await this.feedbackRepository.create(feedbackData);

    return feedback;
  };

  updateFeedback = async (id: string, feedbackData: UpdateFeedbackDTO): Promise<Feedback> => {
    const targetFeedback = await this.feedbackRepository.findById(id);
    if (!targetFeedback || targetFeedback.deletedAt) {
      throw new NotFound(MESSAGES.NOT_FOUND);
    }

    const storage = getStorage();
    const userId = storage.userId;
    if (userId !== targetFeedback.ownerId) {
      throw new Forbidden(MESSAGES.FORBIDDEN);
    }

    const feedback = await this.feedbackRepository.update(id, feedbackData);

    return feedback;
  };

  deleteFeedback = async (id: string): Promise<Feedback> => {
    const targetFeedback = await this.feedbackRepository.findById(id);
    if (!targetFeedback || targetFeedback.deletedAt) {
      throw new NotFound(MESSAGES.NOT_FOUND);
    }

    const storage = getStorage();
    const userId = storage.userId;
    const userRole = storage.userRole;
    if (userId !== targetFeedback.ownerId && userRole !== 'admin') {
      throw new Forbidden(MESSAGES.FORBIDDEN);
    }

    const feedback = await this.feedbackRepository.delete(id);

    return feedback;
  };
}
