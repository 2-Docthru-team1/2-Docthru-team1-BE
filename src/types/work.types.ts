import type { Status } from '@prisma/client';

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
