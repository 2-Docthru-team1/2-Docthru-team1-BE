import type { MediaType, Status } from '@prisma/client';
import type { Challenge, CreateChallengeDTO, UpdateChallengeDTO } from '#types/challenge.types.js';
import { Order } from '#utils/constants/enum.js';

export interface IChallengeService {
  getChallenges(options: {
    status?: Status;
    mediaType?: MediaType;
    keyword: string;
    order: Order;
    page: number;
    pageSize: number;
  }): Promise<{ list: Challenge[]; totalCount: number }>;
  getChallengeById(id: string): Promise<Challenge | null>;
  createChallenge(ChallengeData: CreateChallengeDTO): Promise<Challenge>;
  updateChallenge(id: string, ChallengeData: UpdateChallengeDTO): Promise<Challenge>;
  deleteChallenge(id: string): Promise<Challenge>;
}
