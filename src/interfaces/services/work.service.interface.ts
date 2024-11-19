import type { ChallengeWork } from '@prisma/client';
import type { CreateWorkDTO, UpdateWorkDTO } from '#types/work.types.js';

export interface IWorkService {
  getWorks(options: { orderBy: string; page: number; pageSize: number }): Promise<ChallengeWork[] | null>;
  getWorkById(id: string): Promise<ChallengeWork | null>;
  createWork(WorkData: CreateWorkDTO): Promise<ChallengeWork>;
  updateWork(id: string, WorkData: UpdateWorkDTO): Promise<ChallengeWork>;
  deleteWork(id: string): Promise<ChallengeWork>;
}
