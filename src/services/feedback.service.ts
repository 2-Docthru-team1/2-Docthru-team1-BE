import type { IFeedbackService } from '#interfaces/services/feedback.service.interface.js';
import type { FeedbackRepository } from '#repositories/feedback.repository.js';
import type { CreateFeedbackDTO, UpdateFeedbackDTO } from '#types/work.types.js';
import type { Feedback } from '@prisma/client';

export class FeedbackService implements IFeedbackService {
  constructor(private FeedbackRepository: FeedbackRepository) {} // 이 부분에 Repository를 연결합니다.

  // 이 아래로 데이터를 가공하는 코드를 작성합니다.
  // 비즈니스 로직, DB에서 가져온 데이터를 가공하는 코드가 주로 작성됩니다.
  // 여기서 가공된 데이터를 controller로 올려줍니다.
  getFeedbacks = async (options: { orderBy: string; page: number; pageSize: number }): Promise<Feedback[] | null> => {
    const Feedbacks = await this.FeedbackRepository.findMany(options);

    return Feedbacks;
  };

  getFeedbackById = async (id: string): Promise<Feedback | null> => {
    const Feedback = await this.FeedbackRepository.findById(id);

    return Feedback;
  };

  createFeedback = async (FeedbackData: CreateFeedbackDTO): Promise<Feedback> => {
    const Feedback = await this.FeedbackRepository.create(FeedbackData);

    return Feedback;
  };

  updateFeedback = async (id: string, FeedbackData: UpdateFeedbackDTO): Promise<Feedback> => {
    const Feedback = await this.FeedbackRepository.update(id, FeedbackData);
    return Feedback;
  };

  deleteFeedback = async (id: string): Promise<Feedback> => {
    const Feedback = await this.FeedbackRepository.delete(id);

    return Feedback;
  };
}
