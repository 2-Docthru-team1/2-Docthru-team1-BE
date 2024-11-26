import type { ChallengeWork } from '@prisma/client';
import type { CreateWorkDTO, CreateWorkDTOWithS3Data, RepositoryCreateWorkDTO, UpdateWorkDTO } from '#types/work.types.js';

export interface IWorkRepository {
  findMany(options: { page: number; pageSize: number }): Promise<ChallengeWork[] | null>;
  findById(id: string): Promise<ChallengeWork | null>;
  create(workData: CreateWorkDTOWithS3Data): Promise<ChallengeWork>;
  update(id: string, workData: UpdateWorkDTO): Promise<ChallengeWork>;
  delete(id: string): Promise<ChallengeWork>;
  totalCount(challengeId: string): Promise<number | null>;
  addLike(id: string, userId: string): Promise<ChallengeWork>;
  removeLike(id: string, userId: string): Promise<ChallengeWork>;
}
