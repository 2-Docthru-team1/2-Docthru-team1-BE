import type { Feedback } from '@prisma/client';
import type { BasicOptions } from '#types/common.types.js';
import type { CreateFeedbackDTO, UpdateFeedbackDTO } from '#types/feedback.types.js';

export interface IFeedbackRepository {
  getCount(workId: string): Promise<number>;
  findMany(options: BasicOptions, workId: string): Promise<Feedback[] | null>;
  findById(id: string): Promise<Feedback | null>;
  create(FeedbackData: CreateFeedbackDTO): Promise<Feedback>;
  update(id: string, FeedbackData: UpdateFeedbackDTO): Promise<Feedback>;
  delete(id: string): Promise<Feedback>;
  isDeleted(id: string): Promise<boolean>;
}
