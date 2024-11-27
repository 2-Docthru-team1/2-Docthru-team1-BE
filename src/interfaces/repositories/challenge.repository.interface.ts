import type { AbortReason, Challenge } from '@prisma/client';
import type {
  ChallengeInput,
  ChallengeStatusInput,
  GetMonthlyChallengeOption,
  UpdateChallengeDTO,
  getChallengesOptions,
} from '#types/challenge.types.js';

export interface IChallengeRepository {
  findMany(options: getChallengesOptions): Promise<Challenge[] | null>;
  totalCount(options: getChallengesOptions): Promise<number | null>;
  findById(id: string): Promise<Challenge | null>;
  create(data: ChallengeInput): Promise<Challenge>;
  update(id: string, data: UpdateChallengeDTO): Promise<Challenge>;
  updateStatus(data: ChallengeStatusInput): Promise<Challenge>;
  findAbortReason(id: string): Promise<AbortReason | null>;
  findMonthlyChallenge(option: GetMonthlyChallengeOption, currentYear: number): Promise<Challenge[] | null>;
}
