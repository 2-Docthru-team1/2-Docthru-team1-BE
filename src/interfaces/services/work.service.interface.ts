import type { ChallengeWork } from '@prisma/client';
import type {
  CreateWorkDTO,
  GetWorksOptions,
  ResultChallengeWork,
  UpdateWorkDTO,
  WorkResponseWithUploadUrls,
} from '#types/work.types.js';

export interface IWorkService {
  getWorks(options: GetWorksOptions): Promise<{ list: ResultChallengeWork[]; totalCount: number } | null>;
  getWorkById(id: string): Promise<ResultChallengeWork | null>;
  createWork(WorkData: CreateWorkDTO): Promise<WorkResponseWithUploadUrls>;
  updateWork(id: string, WorkData: UpdateWorkDTO): Promise<WorkResponseWithUploadUrls>;
  deleteWork(id: string): Promise<ResultChallengeWork>;
  likeWork(id: string): Promise<ChallengeWork>;
  unlikeWork(id: string): Promise<ChallengeWork>;
}
