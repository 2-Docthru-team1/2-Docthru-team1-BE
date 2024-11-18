import type { Status } from '@prisma/client';
import { MediaType } from '@prisma/client';
import { Order } from '#utils/constants/enum.js';
import type { BaseModel } from './common.types.js';

export interface Challenge extends BaseModel {
  title: string;
  description: string;
  status: Status;
  deadline: Date;
}

export interface CreateChallengeDTO {
  title: string;
  description: string;
  status: string;
  deadline: Date;
}

export interface UpdateChallengeDTO {
  title?: string;
  description?: string;
  status?: string;
  deadline?: Date;
}
export interface getChallengesOptions {
  status?: Status;
  mediaType?: MediaType;
  order: Order;
  keyword: string;
  page: number;
  pageSize: number;
}
