import type { ChallengeWork } from '@prisma/client';
import type { CreateWorkDTO, GetWorksOptions, ResultChallengeWork, UpdateWorkDTO, WorkOrder } from '#types/work.types.js';

export interface IWorkService {
  getWorks(options: GetWorksOptions): Promise<{ list: ResultChallengeWork[]; totalCount: number } | null>;
  getWorkById(id: string): Promise<ResultChallengeWork | null>;
  createWork(WorkData: CreateWorkDTO): Promise<ChallengeWork>;
  updateWork(id: string, WorkData: UpdateWorkDTO): Promise<ChallengeWork>;
  deleteWork(id: string): Promise<ResultChallengeWork>;
}
