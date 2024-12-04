import type { ChallengeWork, WorkLike } from '@prisma/client';
import prismaClient from '#connection/postgres.connection.js';
import type { IWorkRepository } from '#interfaces/repositories/work.repository.interface.js';
import type { ExtendedPrismaClient } from '#types/common.types.js';
import { type CreateWorkDTOWithS3Data, type GetWorksOptions, type UpdateWorkDTOWithUrls } from '#types/work.types.js';

export class WorkRepository implements IWorkRepository {
  challengeWork: ExtendedPrismaClient['challengeWork'];
  workImage: ExtendedPrismaClient['workImage'];
  challenge: ExtendedPrismaClient['challenge'];

  constructor(client: ExtendedPrismaClient) {
    this.challengeWork = client.challengeWork;
    this.workImage = client.workImage;
    this.challenge = client.challenge;
  }

  findMany = async (options: GetWorksOptions): Promise<ChallengeWork[] | null> => {
    const { challengeId, page, pageSize } = options;
    const works = await this.challengeWork.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: { likeCount: 'desc' },
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
        workLikes: { select: { userId: true } },
      },
    });
    return work;
  };

  create = async (data: CreateWorkDTOWithS3Data): Promise<ChallengeWork> => {
    const { challengeId, imagesData, title, content, userId } = data;

    const createdWork = await prismaClient.$transaction(async prisma => {
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
        include: { images: { select: { imageUrl: true } }, owner: { select: { id: true, name: true, role: true, email: true } } },
      });

      const challenge = await this.challenge.update({
        where: { id: challengeId },
        data: { participants: { connect: { id: userId } } },
      });

      return work;
    });

    return createdWork;
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
    const deletedWork = await prismaClient.$transaction(async prisma => {
      const work = await this.challengeWork.update({
        where: { id },
        data: { deletedAt: new Date() },
        include: {
          owner: {
            select: { id: true, name: true, email: true, role: true },
          },
          images: { select: { imageUrl: true } },
        },
      });
      const challengeAfterDisconnect = await this.challenge.update({
        where: { id: work.challengeId },
        data: { participants: { disconnect: { id: work.ownerId! } } },
      });
      return work;
    });

    return deletedWork;
  };

  addLike = async (id: string, userId: string): Promise<ChallengeWork> => {
    const work = await this.challengeWork.update({
      where: { id },
      data: {
        likeCount: { increment: 1 },
        workLikes: {
          create: {
            userId,
          },
        },
      },
    });
    return work;
  };

  removeLike = async (id: string, userId: string): Promise<ChallengeWork> => {
    const work = await this.challengeWork.update({
      where: { id },
      data: {
        likeCount: { decrement: 1 },
        workLikes: {
          deleteMany: {
            challengeWorkId: id,
            userId: userId,
          },
        },
      },
    });
    return work;
  };
}
