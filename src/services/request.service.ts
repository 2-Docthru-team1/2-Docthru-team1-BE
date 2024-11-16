import type { IRequestService } from '#interfaces/services/request.service.interface.js';
import type { RequestRepository } from '#repositories/request.repository.js';
import type { ChallengeRequest, CreateRequestDTO, UpdateRequestDTO } from '#types/request.types.js';

export class RequestService implements IRequestService {
  constructor(private RequestRepository: RequestRepository) {} // 이 부분에 Repository를 연결합니다.

  // 이 아래로 데이터를 가공하는 코드를 작성합니다.
  // 비즈니스 로직, DB에서 가져온 데이터를 가공하는 코드가 주로 작성됩니다.
  // 여기서 가공된 데이터를 controller로 올려줍니다.
  getRequests = async (options: { orderBy: string; page: number; pageSize: number }): Promise<ChallengeRequest[] | null> => {
    const Requests = await this.RequestRepository.findMany(options);

    return Requests;
  };

  getRequestById = async (id: string): Promise<ChallengeRequest | null> => {
    const ChallengeRequest = await this.RequestRepository.findById(id);

    return ChallengeRequest;
  };

  createRequest = async (RequestData: CreateRequestDTO): Promise<ChallengeRequest> => {
    const ChallengeRequest = await this.RequestRepository.create(RequestData);

    return ChallengeRequest;
  };

  updateRequest = async (id: string, RequestData: UpdateRequestDTO): Promise<ChallengeRequest> => {
    const ChallengeRequest = await this.RequestRepository.update(id, RequestData);
    return ChallengeRequest;
  };

  deleteRequest = async (id: string): Promise<ChallengeRequest> => {
    const ChallengeRequest = await this.RequestRepository.delete(id);

    return ChallengeRequest;
  };
}
