import type { Challenge, MediaType, Status } from '@prisma/client';
import type { ChallengeStatusInput, CreateChallengeDTO, UpdateChallengeDTO } from '#types/challenge.types.js';
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
  createChallenge(challengeData: CreateChallengeDTO, userId: string): Promise<Challenge>;
  updateChallenge(id: string, challengeData: UpdateChallengeDTO): Promise<Challenge>;
  updateStatus({ challengeId, status, abortReason, userId, userRole }: ChallengeStatusInput): Promise<Challenge | null>;
}
