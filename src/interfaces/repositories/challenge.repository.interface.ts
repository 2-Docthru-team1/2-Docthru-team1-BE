import type { AbortReason, Challenge, MediaType, Status } from '@prisma/client';
import type { ChallengeInput, ChallengeStatusInput, UpdateChallengeDTO } from '#types/challenge.types.js';
import { Order } from '#utils/constants/enum.js';

export interface IChallengeRepository {
  findMany(options: {
    status?: Status;
    mediaType?: MediaType[];
    orderBy: Order;
    keyword: string;
    page: Number;
    pageSize: Number;
  }): Promise<Challenge[] | null>;
  totalCount(options: {
    status?: Status;
    mediaType?: MediaType[];
    keyword: string;
    page: number;
    pageSize: number;
  }): Promise<number | null>;

  findById(id: string): Promise<Challenge | null>;
  create(data: ChallengeInput): Promise<Challenge>;
  update(id: string, data: UpdateChallengeDTO): Promise<Challenge>;
  updateStatus(data: ChallengeStatusInput): Promise<Challenge>;
  findAbortReason(id: string): Promise<AbortReason | null>;
}
