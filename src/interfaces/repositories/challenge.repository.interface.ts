import type { Challenge, CreateChallengeDTO, UpdateChallengeDTO } from '#types/challenge.types.js';

export interface IChallengeRepository {
  findMany(options: { orderBy: string; page: number; pageSize: number }): Promise<Challenge[] | null>;
  findById(id: string): Promise<Challenge | null>;
  create(userData: CreateChallengeDTO): Promise<Challenge>;
  update(id: string, userData: UpdateChallengeDTO): Promise<Challenge>;
  delete(id: string): Promise<Challenge>;
}
