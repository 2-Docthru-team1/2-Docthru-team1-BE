import type { Challenge, CreateChallengeDTO, UpdateChallengeDTO } from '#types/challenge.types.js';

export interface IChallengeService {
  getChallenges(options: { orderBy: string; page: number; pageSize: number }): Promise<Challenge[] | null>;
  getChallengeById(id: string): Promise<Challenge | null>;
  createChallenge(ChallengeData: CreateChallengeDTO): Promise<Challenge>;
  updateChallenge(id: string, ChallengeData: UpdateChallengeDTO): Promise<Challenge>;
  deleteChallenge(id: string): Promise<Challenge>;
}
