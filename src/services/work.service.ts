import type { Challenge, ChallengeWork } from '@prisma/client';
import { Role } from '@prisma/client';
import type { IWorkService } from '#interfaces/services/work.service.interface.js';
import { getStorage } from '#middlewares/asyncLocalStorage.js';
import type { ChallengeRepository } from '#repositories/challenge.repository.js';
import type { FeedbackRepository } from '#repositories/feedback.repository.js';
import type { WorkRepository } from '#repositories/work.repository.js';
import { BadRequest, Forbidden, NotFound } from '#types/http-error.types.js';
import type {
  CreateWorkDTOWithId,
  GetWorksOptions,
  ResultChallengeWork,
  UpdateWorkDTO,
  WorkResponseWithUploadUrls,
} from '#types/work.types.js';
import { generatePresignedDownloadUrl } from '#utils/S3/generate-presigned-download-url.js';
import { generateS3ImageArray } from '#utils/S3/generateS3ImageArray.js';
import { changeTypeWorkCreate } from '#utils/changeTypeWork.js';
import MESSAGES from '#utils/constants/messages.js';

export class WorkService implements IWorkService {
  constructor(
    private workRepository: WorkRepository,
    private feedbackRepository: FeedbackRepository,
    private challengeRepository: ChallengeRepository,
  ) {}

  getWorks = async (options: GetWorksOptions): Promise<{ list: ResultChallengeWork[]; totalCount: number } | null> => {
    const targetChallenge = await this.challengeRepository.findById(options.challengeId);
    if (!targetChallenge || targetChallenge.deletedAt) {
      throw new NotFound(MESSAGES.CHALLENGE_NOT_FOUND);
    }

    const [list, totalCount] = await Promise.all([
      this.workRepository.findMany(options),
      this.workRepository.totalCount(options.challengeId),
    ]);

    const changedList = await Promise.all(
      list?.map(async work => {
        const feedbackCount = await this.feedbackRepository.getCount(work.id);
        const { ownerId, ...other } = work;
        return { feedbackCount, ...other };
      }) || [],
    ); // NOTE owner 속성에 ownerId가 드가 있기 때문에 필터링

    const promises = changedList?.map(async work => {
      const changedWork = work as ResultChallengeWork & { feedbackCount: number };
      const updatedImages = await Promise.all(
        changedWork.images.map(async workImage => {
          const url = workImage.imageUrl;
          const resultUrl = await generatePresignedDownloadUrl(url);
          workImage.imageUrl = resultUrl;
          return workImage;
        }),
      );
      return { ...work, images: updatedImages }; // NOTE work 객체를 업데이트하여 반환
    });

    const updatedList = await Promise.all(promises || []);
    return { list: (updatedList as ResultChallengeWork[]) || [], totalCount: totalCount || 0 };
  };

  getWorkById = async (id: string): Promise<ResultChallengeWork | null> => {
    const work = await this.workRepository.findById(id);
    if (!work || work.deletedAt) {
      throw new NotFound(MESSAGES.NOT_FOUND);
    }

    const { ownerId, ...otherWorkField } = work || {};
    const changedWork = { ...otherWorkField } as ResultChallengeWork & { likeUsers: { id: string }[] };
    const updatedImages = await Promise.all(
      changedWork.images.map(async workImage => {
        const url = workImage.imageUrl;
        const resultUrl = await generatePresignedDownloadUrl(url);
        workImage.imageUrl = resultUrl;
        return workImage;
      }),
    );

    return { ...changedWork, images: updatedImages };
  };

  createWork = async (workData: CreateWorkDTOWithId): Promise<WorkResponseWithUploadUrls> => {
    const storage = getStorage();
    const userId = storage.userId;

    const challenge = await this.challengeRepository.findById(workData.challengeId);
    const challengeWithParticipants = challenge as Challenge & { participants: { id: string }[] };
    if (!challenge) {
      throw new NotFound(MESSAGES.NOT_FOUND);
    }

    const isUserParticipating = challengeWithParticipants.participants.some(participant => participant.id === userId);
    if (isUserParticipating) {
      throw new BadRequest(MESSAGES.BAE_REQUEST_PARTICIPATION);
    }

    const { imageCount, ...restWorkData } = workData;
    const imagesData = await generateS3ImageArray(imageCount);
    const repositoryWork = { ...restWorkData, imagesData, userId };
    const work = await this.workRepository.create(repositoryWork);
    //여기서 유저와 챌린지를 연결

    const workWithUploadUrls = changeTypeWorkCreate({ ...work, imagesData });
    return workWithUploadUrls;
  };

  updateWork = async (id: string, workData: UpdateWorkDTO): Promise<WorkResponseWithUploadUrls> => {
    const storage = getStorage();
    const userId = storage.userId;

    const { imageCount, ...other } = workData;
    const FoundWork = await this.workRepository.findById(id);
    if (!FoundWork || FoundWork.deletedAt) {
      throw new NotFound(MESSAGES.NOT_FOUND);
    }
    if (userId !== FoundWork.ownerId) {
      throw new Forbidden(MESSAGES.FORBIDDEN);
    }

    const imagesData = await generateS3ImageArray(imageCount!);
    const repositoryWork = { imagesData, ...other };
    const work = await this.workRepository.update(id, repositoryWork);
    const workWithUploadUrls = changeTypeWorkCreate({ ...work, imagesData });

    return workWithUploadUrls;
  };

  deleteWork = async (id: string): Promise<ResultChallengeWork> => {
    const storage = getStorage();
    const userId = storage.userId;
    const userRole = storage.userRole;
    const foundWork = await this.workRepository.findById(id);

    if (!foundWork || foundWork.deletedAt) {
      throw new NotFound(MESSAGES.NOT_FOUND);
    }
    if (userId !== foundWork.ownerId && userRole !== Role.admin) {
      throw new Forbidden(MESSAGES.FORBIDDEN);
    }

    const deletedWork = await this.workRepository.delete(id);
    const { ownerId, ...otherWorkField } = deletedWork || {};
    const changedWork = { ...otherWorkField } as ResultChallengeWork;
    const updatedImages = await Promise.all(
      changedWork.images.map(async workImage => {
        const url = workImage.imageUrl;
        const resultUrl = await generatePresignedDownloadUrl(url);
        workImage.imageUrl = resultUrl;
        return workImage;
      }),
    );

    return { ...otherWorkField, images: updatedImages };
  };

  likeWork = async (id: string): Promise<ChallengeWork> => {
    const storage = getStorage();
    const userId = storage.userId;

    const foundWork = await this.workRepository.findById(id); // 여기서 가져와서 체크
    if (!foundWork || foundWork?.deletedAt) {
      throw new NotFound(MESSAGES.NOT_FOUND);
    }
    const foundWorkWithWorkLikes = foundWork as ChallengeWork & { workLikes: { userId: string }[] };
    const isLike = foundWorkWithWorkLikes!.workLikes.some(workLike => workLike.userId === userId);
    if (isLike) {
      throw new BadRequest(MESSAGES.ALREADY_LIKED_MESSAGE);
    }

    const updatedWork = await this.workRepository.addLike(id, userId);

    return updatedWork;
  };

  unlikeWork = async (id: string): Promise<ChallengeWork> => {
    const storage = getStorage();
    const userId = storage.userId;

    const foundWork = await this.workRepository.findById(id);
    if (!foundWork || foundWork?.deletedAt) {
      throw new NotFound(MESSAGES.NOT_FOUND);
    }
    const foundWorkWithWorkLikes = foundWork as ChallengeWork & { workLikes: { userId: string }[] };
    const isLike = foundWorkWithWorkLikes!.workLikes.some(workLike => workLike.userId === userId);
    if (!isLike) {
      throw new BadRequest(MESSAGES.UNLIKE_NOT_CURRENTLY_LIKED);
    }

    const updatedWork = await this.workRepository.removeLike(id, userId);
    return updatedWork;
  };
}
