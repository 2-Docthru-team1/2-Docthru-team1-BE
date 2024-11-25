import type { AbortReason, Challenge, MediaType, Status } from '@prisma/client';
import type { ChallengeStatusInput, CreateChallengeDTO, UpdateChallengeDTO } from '#types/challenge.types.js';
import { Order } from '#utils/constants/enum.js';

export interface IChallengeService {
  getChallenges(options: {
    status?: Status;
    mediaType?: MediaType[];
    keyword: string;
    orderBy: Order;
    page: number;
    pageSize: number;
  }): Promise<{ list: Omit<Challenge, 'isHidden' | 'requestUserId'>[]; totalCount: number }>;
  getChallengeById(id: string): Promise<Challenge | null>;
  createChallenge(
    challengeData: CreateChallengeDTO,
    userId: string,
  ): Promise<{ challenge: Challenge; uploadUrls: { uploadUrl: string }[] }>;
  updateChallenge(
    id: string,
    challengeData: UpdateChallengeDTO,
    userId: string,
  ): Promise<{ challenge: Challenge; uploadUrls: { uploadUrl: string }[] }>;
  updateStatus(data: ChallengeStatusInput): Promise<Challenge | null>;
  getAbortReason(id: string): Promise<AbortReason | null>;
}
