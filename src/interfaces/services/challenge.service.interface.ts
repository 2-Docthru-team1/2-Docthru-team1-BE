import type { AbortReason } from '@prisma/client';
import type {
  ChallengeStatusInput,
  CreateChallengeDTO,
  CustomChallenge,
  GetMonthlyChallengeOption,
  UpdateChallengeDTO,
  getChallengesOptions,
} from '#types/challenge.types.js';

export interface IChallengeService {
  getChallenges(options: getChallengesOptions): Promise<{ list: CustomChallenge[]; totalCount: number }>;
  getChallengeById(id: string): Promise<CustomChallenge | null>;
  createChallenge(
    challengeData: CreateChallengeDTO,
  ): Promise<{ challenge: CustomChallenge; uploadUrls: { uploadUrl: string }[] }>;
  updateChallenge(
    id: string,
    challengeData: UpdateChallengeDTO,
  ): Promise<{ challenge: CustomChallenge; uploadUrls: { uploadUrl: string }[] }>;
  updateStatus(data: ChallengeStatusInput): Promise<CustomChallenge | null>;
  getAbortReason(id: string): Promise<AbortReason | null>;
  getMonthlyChallenge(option: GetMonthlyChallengeOption): Promise<CustomChallenge[] | null>;
}
