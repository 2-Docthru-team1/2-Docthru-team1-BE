import type { ChallengeWork } from '@prisma/client';
import type { CreateWorkDTO, CreateWorkDTOWithS3Data, RepositoryCreateWorkDTO, UpdateWorkDTO } from '#types/work.types.js';

export interface IWorkRepository {
  findMany(options: { orderBy: string; page: number; pageSize: number }): Promise<ChallengeWork[] | null>;
  findById(id: string): Promise<ChallengeWork | null>;
  create(workData: CreateWorkDTOWithS3Data): Promise<ChallengeWork>;
  update(id: string, workData: UpdateWorkDTO): Promise<ChallengeWork>;
  delete(id: string): Promise<ChallengeWork>;
  totalCount(challengeId: string): Promise<number | null>;
}
