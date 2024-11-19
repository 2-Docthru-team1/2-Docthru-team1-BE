import type { Status } from '@prisma/client';
import { MediaType } from '@prisma/client';
import { Order } from '#utils/constants/enum.js';

export interface GetChallengesQuery {
  status?: string;
  mediaType?: string;
  order?: string;
  keyword?: string;
  page?: string;
  pageSize?: string;
  isHidden?: string;
}

export interface getChallengesOptions {
  status?: Status;
  mediaType?: MediaType;
  order: Order;
  keyword: string;
  page: number;
  pageSize: number;
}

// export interface CreateChallengeDTO {
//   title: string;
//   description: string;
//   status: string;
//   deadline: Date;
// }

// export interface UpdateChallengeDTO {
//   title?: string;
//   description?: string;
//   status?: string;
//   deadline?: Date;
// }
