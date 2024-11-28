import type { Challenge, MediaType, MonthlyType, Role, Status } from '@prisma/client';
import { Order } from '#utils/constants/enum.js';

export type CustomChallenge = Omit<Challenge, 'isHidden' | 'requestUserId'>;

export interface GetChallengesQuery {
  status?: string;
  mediaType?: string;
  orderBy?: string;
  keyword?: string;
  page?: string;
  pageSize?: string;
  isHidden?: string;
  filter?: string;
}

export interface getChallengesOptions {
  status?: Status[];
  mediaType?: MediaType[];
  orderBy: Order;
  keyword: string;
  page: number;
  pageSize: number;
  admin?: boolean;
  requestUserId?: string;
  participantId?: string;
}

export interface GetMonthlyChallengeOption {
  monthly: MonthlyType;
}

export interface filteredChallenge extends Omit<Challenge, 'isHidden' | 'requestUserId'> {}

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

export interface ChallengeInput extends Omit<CreateChallengeDTO, 'imageCount'> {
  status: Status;
  isHidden: boolean;
  requestUserId: string;
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

export interface UpdateChallengeStatusDTO extends ChallengeStatusInput {}

export interface ChallengeStatusInput {
  challengeId: string;
  status: Status;
  abortReason?: string;
  userId?: string;
  userRole?: Role;
}

export interface ValidateUpdateStatusInput {
  challenge: Challenge | null;
  status: Status;
  abortReason?: string;
  userId: string;
  userRole?: Role;
}
