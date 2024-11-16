import type { ChallengeWork, CreateWorkDTO, UpdateWorkDTO } from '#types/work.types.js';

export interface IWorkRepository {
  findMany(options: { orderBy: string; page: number; pageSize: number }): Promise<ChallengeWork[] | null>;
  findById(id: string): Promise<ChallengeWork | null>;
  create(workData: CreateWorkDTO): Promise<ChallengeWork>;
  update(id: string, workData: UpdateWorkDTO): Promise<ChallengeWork>;
  delete(id: string): Promise<ChallengeWork>;
}
