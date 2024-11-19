import type { Challenge,  MediaType, Status } from '@prisma/client';
import type { CreateChallengeDTO, UpdateChallengeDTO } from '#types/challenge.types.js';
import { Order } from '#utils/constants/enum.js';

export interface IChallengeRepository {
  findMany(options: {
    status?: Status;
    mediaType?: MediaType;
    order: Order;
    keyword: string;
    page: Number;
    pageSize: Number;
  }): Promise<Challenge[] | null>;
  totalCount(options: {
    status?: Status;
    mediaType?: MediaType;
    keyword: string;
    page: number;
    pageSize: number;
  }): Promise<number | null>;

  findById(id: string): Promise<Challenge | null>;
  create(userData: CreateChallengeDTO): Promise<Challenge>;
  update(id: string, userData: UpdateChallengeDTO): Promise<Challenge>;
  delete(id: string): Promise<Challenge>;
}
