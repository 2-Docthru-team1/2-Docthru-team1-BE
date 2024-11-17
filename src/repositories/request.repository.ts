import type { PrismaClient } from '@prisma/client';
import type { IRequestRepository } from '#interfaces/repositories/request.repository.interface.js';
import type { ChallengeRequest, CreateRequestDTO, UpdateRequestDTO } from '#types/request.types.js';

export class RequestRepository implements IRequestRepository {
  private challenge: PrismaClient['challenge'];

  constructor(client: PrismaClient) {
    this.challenge = client.challenge; // 이 부분에 각 모델(스키마)를 연결합니다.
  }

  // 이 아래로 직접 DB와 통신하는 코드를 작성합니다.
  // 여기서 DB와 통신해 받아온 데이터를 위로(service로) 올려줍니다.
  findMany = async (options: { orderBy: string; page: number; pageSize: number }): Promise<ChallengeRequest[] | null> => {
    const requests = await this.challenge.findMany();

    return requests;
  };

  findById = async (id: string): Promise<ChallengeRequest | null> => {
    const request = await this.challenge.findUnique({ where: { id } });

    return request;
  };

  create = async (data: CreateRequestDTO): Promise<ChallengeRequest> => {
    const request = await this.challenge.create({ data });

    return request;
  };

  update = async (id: string, data: UpdateRequestDTO): Promise<ChallengeRequest> => {
    const request = await this.challenge.update({ where: { id }, data });

    return request;
  };

  delete = async (id: string): Promise<ChallengeRequest> => {
    const request = await this.challenge.delete({ where: { id } });

    return request;
  };
}
