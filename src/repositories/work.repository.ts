import type { ChallengeWork, PrismaClient } from '@prisma/client';
import type { IWorkRepository } from '#interfaces/repositories/work.repository.interface.js';
import { type CreateWorkDTO, type GetWorksOptions, type UpdateWorkDTO, WorkOrder } from '#types/work.types.js';

export class WorkRepository implements IWorkRepository {
  constructor(private challengeWork: PrismaClient['challengeWork']) {}

  // 이 아래로 직접 DB와 통신하는 코드를 작성합니다.
  // 여기서 DB와 통신해 받아온 데이터를 위로(service로) 올려줍니다.
  findMany = async (options: GetWorksOptions): Promise<ChallengeWork[] | null> => {
    const { challengeId, orderBy, page, pageSize } = options;
    const orderResult: { createdAt: 'desc' } | { likeCount: 'desc' } =
      orderBy === WorkOrder.recent ? { createdAt: 'desc' } : { likeCount: 'desc' };
    const works = await this.challengeWork.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: orderResult,
      where: { challengeId, deletedAt: null },
      include: {
        owner: { select: { id: true, name: true, email: true, role: true } },
        images: true,
      },
    });
    return works;
  };
  totalCount = async (challengeId: string): Promise<number | null> => {
    const totalCount = await this.challengeWork.count({ where: { challengeId, deletedAt: null } });
    return totalCount;
  };
  findById = async (id: string): Promise<ChallengeWork | null> => {
    const work = await this.challengeWork.findUnique({
      where: { id, deletedAt: null },
      include: {
        owner: { select: { id: true, name: true, email: true, role: true } },
        images: true,
      },
    });
    return work;
  };

  create = async (data: CreateWorkDTO): Promise<ChallengeWork> => {
    const work = await this.challengeWork.create({ data });

    return work;
  };

  update = async (id: string, data: UpdateWorkDTO): Promise<ChallengeWork> => {
    const work = await this.challengeWork.update({ where: { id, deletedAt: null }, data });

    return work;
  };

  delete = async (id: string): Promise<ChallengeWork> => {
    const work = await this.challengeWork.update({ where: { id, deletedAt: null }, data: { deletedAt: new Date() } });

    return work;
  };
}
