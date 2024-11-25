import type { ChallengeWork, WorkImage } from '@prisma/client';
import type { IWorkRepository } from '#interfaces/repositories/work.repository.interface.js';
import { getStorage } from '#middlewares/asyncLocalStorage.js';
import type { ExtendedPrismaClient } from '#types/common.types.js';
import {
  type CreateWorkDTO,
  type CreateWorkDTOWithS3Data,
  type GetWorksOptions,
  type RepositoryCreateWorkDTO,
  type UpdateWorkDTO,
  type UpdateWorkDTOWithUrls,
  WorkOrder,
} from '#types/work.types.js';

export class WorkRepository implements IWorkRepository {
  challengeWork: ExtendedPrismaClient['challengeWork'];
  workImage: ExtendedPrismaClient['workImage'];

  constructor(client: ExtendedPrismaClient) {
    this.challengeWork = client.challengeWork;
    this.workImage = client.workImage;
  }
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
      where: { challengeId },
      include: {
        owner: { select: { id: true, name: true, email: true, role: true } },
        images: { select: { imageUrl: true } },
      },
    });
    return works;
  };
  totalCount = async (challengeId: string): Promise<number | null> => {
    const totalCount = await this.challengeWork.count({ where: { challengeId } });
    return totalCount;
  };
  findById = async (id: string): Promise<ChallengeWork | null> => {
    const work = await this.challengeWork.findUnique({
      where: { id },
      include: {
        owner: { select: { id: true, name: true, email: true, role: true } },
        images: { select: { imageUrl: true } },
      },
    });
    return work;
  };

  create = async (data: CreateWorkDTOWithS3Data): Promise<ChallengeWork> => {
    const { challengeId, imagesData, title, content } = data;
    const storage = getStorage();
    const userId = storage.userId;
    const work = await this.challengeWork.create({
      data: {
        title,
        content,
        challenge: { connect: { id: challengeId } },
        owner: { connect: { id: userId } },
        images: {
          create: imagesData.map(imageData => ({ imageUrl: imageData.s3Key })),
        },
      },
      include: { images: true, owner: { select: { id: true, name: true, role: true, email: true } } },
    });
    return work;
  };

  update = async (id: string, data: UpdateWorkDTOWithUrls): Promise<ChallengeWork> => {
    const { imagesData, ...other } = data;
    const work = await this.challengeWork.update({
      where: { id },
      data: {
        ...other,
      },
      include: { owner: { select: { id: true, name: true, role: true, email: true } }, images: true },
    });
    if (imagesData?.length) {
      const existngWorkImages = work.images;
      await this.workImage.deleteMany({ where: { workId: id } });
      const newWorkImages = await Promise.all(
        imagesData.map(imageData => this.workImage.create({ data: { imageUrl: imageData.s3Key, workId: id } })),
      );
    }

    return work;
  };

  delete = async (id: string): Promise<ChallengeWork> => {
    const work = await this.challengeWork.update({
      where: { id },
      data: { deletedAt: new Date() },
      include: { owner: { select: { id: true, name: true, email: true, role: true } }, images: { select: { imageUrl: true } } },
    });
    return work;
  };
}
