import type { ChallengeWork, PrismaClient, WorkImage } from '@prisma/client';
import { randomUUID } from 'crypto';
import type { IWorkRepository } from '#interfaces/repositories/work.repository.interface.js';
import { type CreateWorkDTO, type GetWorksOptions, type UpdateWorkDTO, WorkOrder } from '#types/work.types.js';
import { generatePresignedUploadUrl } from '#utils/S3/generate-presigned-upload-url.js';

export class WorkRepository implements IWorkRepository {
  constructor(
    private challengeWork: PrismaClient['challengeWork'],
    private workImage: PrismaClient['workImage'],
  ) {}
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

  create = async (data: CreateWorkDTO): Promise<ChallengeWork> => {
    const { challengeId, ownerId, images, title, content } = data;
    // const files = images.map((image, index) => ({ //겸사겸사 이렇게 쓰는게 맞는지도 봐주세요
    //   key: `userId/${randomUUID()}_${index}`, // S3에 저장할 고유한 키 생성
    //   contentType: 'image/png', // MIME 타입 설정
    // }));
    // const uploadUrls = await Promise.all(files.map(file => generatePresignedUploadUrl(file.key, file.contentType)));
    const work = await this.challengeWork.create({
      data: {
        title,
        content,
        challenge: { connect: { id: challengeId } },
        owner: { connect: { id: ownerId } },
        images: {
          create: images.map(image => ({ imageUrl: image })),
        },
      },
      include: { images: { select: { imageUrl: true } } },
    });
    return work;
  };

  update = async (id: string, data: UpdateWorkDTO): Promise<ChallengeWork> => {
    const { images, ...other } = data;
    const work = await this.challengeWork.update({
      where: { id },
      data: {
        ...other,
      },
      include: { owner: { select: { id: true, name: true, email: true, role: true } }, images: true },
    });
    if (!!images) {
      const existingWorkImages = work.images;
      await Promise.all(existingWorkImages.map(workImage => this.workImage.delete({ where: { id: workImage.id } })));
      const newWorkImages = await Promise.all(
        images.map(image => this.workImage.create({ data: { imageUrl: image, workId: id } })),
      );
      work.images = newWorkImages;
    }
    return work;
  };

  delete = async (id: string): Promise<ChallengeWork> => {
    const work = await this.challengeWork.update({ where: { id }, data: { deletedAt: new Date() } });

    return work;
  };
}
