import type { IWorkRepository } from '#interfaces/repositories/work.repository.interface.js';
import type { ChallengeWork, CreateWorkDTO, UpdateWorkDTO } from '#types/work.types.js';
import type { PrismaClient } from '@prisma/client';

export class WorkRepository implements IWorkRepository {
  private challengeWork: PrismaClient['challengeWork'];

  constructor(client: PrismaClient) {
    this.challengeWork = client.challengeWork; // 이 부분에 각 모델(스키마)를 연결합니다.
  }

    // 이 아래로 직접 DB와 통신하는 코드를 작성합니다.
  // 여기서 DB와 통신해 받아온 데이터를 위로(service로) 올려줍니다.
  findMany = async (options: { orderBy: string; page: number; pageSize: number }): Promise<ChallengeWork[] | null> => {
    const works = await this.challengeWork.findMany();

    return works;
  };

  findById = async (id: string): Promise<ChallengeWork | null> => {
    const work = await this.challengeWork.findUnique({ where: { id } });

    return work;
  };

  create = async (data: CreateWorkDTO): Promise<ChallengeWork> => {
    const work = await this.challengeWork.create({ data });

    return work;
  };

  update = async (id: string, data: UpdateWorkDTO): Promise<ChallengeWork> => {
    const work = await this.challengeWork.update({ where: { id }, data });

    return work;
  };

  delete = async (id: string): Promise<ChallengeWork> => {
    const work = await this.challengeWork.delete({ where: { id } });

    return work;
  };
}
