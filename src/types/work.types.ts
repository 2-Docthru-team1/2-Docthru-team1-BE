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
export interface GetWorksOptions {
  challengeId: string;
  orderBy: WorkOrder;
  page: number;
  pageSize: number;
}
export enum WorkOrder {
  recent = 'recent',
  favoritest = 'favoritest',
}
