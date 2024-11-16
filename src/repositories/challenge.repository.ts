import type { IChallengeRepository } from '#interfaces/repositories/challenge.repository.interface.js';
import type { Challenge, CreateChallengeDTO, UpdateChallengeDTO } from '#types/challenge.types.js';
import type { PrismaClient } from '@prisma/client';

export class ChallengeRepository implements IChallengeRepository {
  private challenge: PrismaClient['challenge'];
  
  constructor(client: PrismaClient) {
    this.challenge = client.challenge; // 이 부분에 각 모델(스키마)를 연결합니다.
  }

  // 이 아래로 직접 DB와 통신하는 코드를 작성합니다.
  // 여기서 DB와 통신해 받아온 데이터를 위로(service로) 올려줍니다.
  findMany = async (options: { orderBy: string; page: number; pageSize: number }): Promise<Challenge[] | null> => {
    const challenges = await this.challenge.findMany();

    return challenges;
  };

  findById = async (id: string): Promise<Challenge | null> => {
    const challenge = await this.challenge.findUnique({ where: { id } });

    return challenge;
  };

  create = async (data: CreateChallengeDTO): Promise<Challenge> => {
    const challenge = await this.challenge.create({ data });

    return challenge;
  };

  update = async (id: string, data: UpdateChallengeDTO): Promise<Challenge> => {
    const challenge = await this.challenge.update({ where: { id }, data });

    return challenge;
  };

  delete = async (id: string): Promise<Challenge> => {
    const challenge = await this.challenge.delete({ where: { id } });

    return challenge;
  };
}
