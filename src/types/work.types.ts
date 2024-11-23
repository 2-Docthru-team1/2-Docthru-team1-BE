import type { ChallengeWork, Status, User, WorkImage } from '@prisma/client';

export interface CreateWorkDTO {
  title: string;
  content: string;
  images: string[];
  ownerId: string;
  challengeId: string;
}
export type RequestCreateWorkDTO = Omit<CreateWorkDTO, 'challengeId' | 'ownerId'>;

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
export type ResultChallengeWork = Omit<ChallengeWork, 'ownerId'> & { images: WorkImage[] };
export enum WorkOrder {
  recent = 'recent',
  favoritest = 'favoritest',
}
