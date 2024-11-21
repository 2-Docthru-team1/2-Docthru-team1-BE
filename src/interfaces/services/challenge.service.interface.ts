import type { AbortReason, Challenge, MediaType, Status } from '@prisma/client';
import type { ChallengeStatusInput, CreateChallengeDTO, UpdateChallengeDTO } from '#types/challenge.types.js';
import { Order } from '#utils/constants/enum.js';

export interface IChallengeService {
  getChallenges(options: {
    status?: Status;
    mediaType?: MediaType;
    keyword: string;
    orderBy: Order;
    page: number;
    pageSize: number;
  }): Promise<{ list: Challenge[]; totalCount: number }>;
  getChallengeById(id: string): Promise<Challenge | null>;
  createChallenge(challengeData: CreateChallengeDTO, userId: string): Promise<Challenge>;
  updateChallenge(id: string, challengeData: UpdateChallengeDTO): Promise<Challenge>;
  updateStatus(data: ChallengeStatusInput): Promise<Challenge | null>;
  getAbortReason(id: string): Promise<AbortReason | null>;
}
