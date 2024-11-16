import type { ChallengeRequest, CreateRequestDTO, UpdateRequestDTO } from '#types/request.types.js';

export interface IRequestService {
  getRequests(options: { orderBy: string; page: number; pageSize: number }): Promise<ChallengeRequest[] | null>;
  getRequestById(id: string): Promise<ChallengeRequest | null>;
  createRequest(RequestData: CreateRequestDTO): Promise<ChallengeRequest>;
  updateRequest(id: string, RequestData: UpdateRequestDTO): Promise<ChallengeRequest>;
  deleteRequest(id: string): Promise<ChallengeRequest>;
}
