import type { Challenge, MediaType, Role, Status } from '@prisma/client';
import { Order } from '#utils/constants/enum.js';

export interface GetChallengesQuery {
  status?: string;
  mediaType?: string;
  orderBy?: string;
  keyword?: string;
  page?: string;
  pageSize?: string;
  isHidden?: string;
}

export interface getChallengesOptions {
  status?: Status;
  mediaType?: MediaType[];
  orderBy: Order;
  keyword: string;
  page: number;
  pageSize: number;
}

export interface CreateChallengeDTO {
  title: string;
  description: string;
  deadline: Date;
  embedUrl: string;
  imageUrl: string;
  imageUrl2?: string;
  mediaType: MediaType;
  imageCount: number;
}

export interface ChallengeInput {
  title: string;
  description: string;
  deadline: Date;
  embedUrl: string;
  imageUrl: string;
  imageUrl2?: string;
  mediaType: MediaType;
  status: Status;
  isHidden: boolean;
  requestUserId: string;
  participants: { id: string }[];
}

export interface UpdateChallengeDTO {
  title?: string;
  description?: string;
  deadline?: Date;
  embedUrl?: string;
  imageUrl?: string;
  imageUrl2?: string;
  mediaType?: MediaType;
  imageCount?: number;
}

export interface UpdateChallengeStatusDTO {
  status: Status;
  abortReason?: string;
}

export interface ChallengeStatusInput {
  challengeId: string;
  status: Status;
  abortReason?: string;
  userId: string;
  userRole?: Role;
}

export interface ValidateUpdateStatusInput {
  challenge: Challenge | null;
  status: Status;
  abortReason?: string;
  userId: string;
  userRole?: Role;
}
