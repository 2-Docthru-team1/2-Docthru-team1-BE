import type { Status } from '@prisma/client';
import type { BaseModel } from '#types/common.types.js';

export interface ChallengeWork extends BaseModel {
  title: string;
  content: string;
  password: string;
  likeCount: Number;
  status: Status;
  ownerId: string | null;
  challengId: string | null;
}

export interface WorkImage extends BaseModel {
  image: string;
  workId: string;
}

export interface Feedback extends BaseModel {
  content: string;
  image: string;
  ownerId: string | null;
  workId: string;
}

export interface CreateWorkDTO {
  status: Status;
  likeCount: number;
  title: string;
  content: string;
  deadline: Date;
  ownerId: string;
  challengeId: string;
}

export interface UpdateWorkDTO {
  status?: Status;
  likeCount?: number;
  title?: string;
  content?: string;
  deadline?: Date;
}

export interface CreateImageDTO {
  image: string;
  workId: string;
}

export interface UpdateWorkDTO {
  image: string;
}

export interface CreateFeedbackDTO {
  content: string;
  image: string;
  ownerId: string;
  workId: string;
}

export interface UpdateFeedbackDTO {
  content?: string;
  image?: string;
}
