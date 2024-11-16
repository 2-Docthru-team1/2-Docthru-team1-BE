import type { ChallengeRequest, CreateRequestDTO, UpdateRequestDTO } from '#types/request.types.js';

export interface IRequestRepository {
  findMany(options: { orderBy: string; page: number; pageSize: number }): Promise<ChallengeRequest[] | null>;
  findById(id: string): Promise<ChallengeRequest | null>;
  create(requestData: CreateRequestDTO): Promise<ChallengeRequest>;
  update(id: string, requestData: UpdateRequestDTO): Promise<ChallengeRequest>;
  delete(id: string): Promise<ChallengeRequest>;
}
