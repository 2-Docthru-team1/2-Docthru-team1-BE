import type { Feedback } from '@prisma/client';
import type { IFeedbackService } from '#interfaces/services/feedback.service.interface.js';
import { getStorage } from '#middlewares/asyncLocalStorage.js';
import type { FeedbackRepository } from '#repositories/feedback.repository.js';
import type { WorkRepository } from '#repositories/work.repository.js';
import type { BasicOptions } from '#types/common.types.js';
import type { CreateFeedbackDTO, UpdateFeedbackDTO } from '#types/feedback.types.js';
import { Forbidden } from '#types/http-error.types.js';
import assertExist from '#utils/assertExist.js';
import MESSAGES from '#utils/constants/messages.js';
import { userSocketMap } from '#utils/socket/socket.utils.js';
import { io } from '../app.js';

export class FeedbackService implements IFeedbackService {
  constructor(
    private feedbackRepository: FeedbackRepository,
    private workRepository: WorkRepository,
  ) {}

  getFeedbacks = async (options: BasicOptions, workId: string): Promise<{ totalCount: number; list: Feedback[] | null }> => {
    const targetWork = await this.workRepository.findById(workId);
    assertExist(targetWork);

    const totalCount = await this.feedbackRepository.getCount(workId);
    const feedbacks = await this.feedbackRepository.findMany(options, workId);

    return { totalCount, list: feedbacks };
  };

  getFeedbackById = async (id: string): Promise<Feedback | null> => {
    const feedback = await this.feedbackRepository.findById(id);
    assertExist(feedback);

    return feedback;
  };

  createFeedback = async (feedbackData: CreateFeedbackDTO): Promise<Feedback> => {
    const feedback = await this.feedbackRepository.create(feedbackData);

    const ownerId = feedback.ownerId;
    const ownerSocketId = userSocketMap.get(ownerId as string);
    if (!ownerSocketId) {
      throw new Error(MESSAGES.NOT_FOUND);
    }

    if (ownerSocketId) {
      io.to(ownerSocketId).emit('newFeedback', {
        message: '새로운 댓글이 등록되었습니다.',
        workId: feedback.workId,
        createdAt: new Date(),
      });
    }

    return feedback;
  };

  updateFeedback = async (id: string, feedbackData: UpdateFeedbackDTO): Promise<Feedback> => {
    const targetFeedback = await this.feedbackRepository.findById(id);
    assertExist(targetFeedback);

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
    assertExist(targetFeedback);

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
