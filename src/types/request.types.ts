import type { Progress } from '@prisma/client';
import type { BaseModel } from './common.types.js';

export interface ChallengeRequest extends BaseModel {
  title: string;
  content: string;
  image: string;
  image2?: string | null;
  progress: Progress;
  deadline: Date;
  userId: string;
}

export interface DenyReason extends BaseModel {
  content: string;
  adminId: string;
  requestId: string;
}

export interface CreateRequestDTO {
  title: string;
  content: string;
  image: string;
  image2: string | null;
  progress: Progress;
  deadline: Date;
  userId: string;
}

export interface UpdateRequestDTO {
  title?: string;
  content?: string;
  image?: string;
  image2?: string | null;
  progress?: Progress;
  deadline?: Date;
}
