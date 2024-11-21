import type { ChallengeWork, WorkImage } from '@prisma/client';
import type { IWorkService } from '#interfaces/services/work.service.interface.js';
import type { WorkRepository } from '#repositories/work.repository.js';
import type { CreateWorkDTO, UpdateWorkDTO } from '#types/work.types.js';
import type { GetWorksOptions, ResultChallengeWork } from '#types/work.types.js';
import { generatePresignedDownloadUrl } from '#utils/S3/generate-presigned-download-url.js';
import type { WORK_IMAGES } from '@/prisma/mock/challengeWorkMock.js';

export class WorkService implements IWorkService {
  constructor(private WorkRepository: WorkRepository) {} // 이 부분에 Repository를 연결합니다.

  // 이 아래로 데이터를 가공하는 코드를 작성합니다.
  // 비즈니스 로직, DB에서 가져온 데이터를 가공하는 코드가 주로 작성됩니다.
  // 여기서 가공된 데이터를 controller로 올려줍니다.
  getWorks = async (options: GetWorksOptions): Promise<{ list: ResultChallengeWork[]; totalCount: number } | null> => {
    const [list, totalCount] = await Promise.all([
      this.WorkRepository.findMany(options),
      this.WorkRepository.totalCount(options.challengeId),
    ]);
    const changedList =
      list?.map(work => {
        const { ownerId, ...other } = work;
        return { ...other };
      }) || []; //owner 속성에 ownerId가 드가 있기 때문에 필터링
    const promises = changedList?.map(async work => {
      const changedWork = work as ResultChallengeWork;
      const updatedImages = await Promise.all(
        changedWork.images.map(async workImage => {
          const url = workImage.imageUrl;
          const resultUrl = await generatePresignedDownloadUrl(url);
          workImage.imageUrl = resultUrl;
          return workImage;
        }),
      );
      return { ...work, images: updatedImages }; // work 객체를 업데이트하여 반환
    });
    const updatedList = await Promise.all(promises || []);
    return { list: (updatedList as ResultChallengeWork[]) || [], totalCount: totalCount || 0 };
  };

  getWorkById = async (id: string): Promise<ChallengeWork | null> => {
    const work = await this.WorkRepository.findById(id);
    return work;
  };

  createWork = async (WorkData: CreateWorkDTO): Promise<ChallengeWork> => {
    const Work = await this.WorkRepository.create(WorkData);

    return Work;
  };

  updateWork = async (id: string, WorkData: UpdateWorkDTO): Promise<ChallengeWork> => {
    const Work = await this.WorkRepository.update(id, WorkData);
    return Work;
  };

  deleteWork = async (id: string): Promise<ChallengeWork> => {
    const Work = await this.WorkRepository.delete(id);

    return Work;
  };
}
