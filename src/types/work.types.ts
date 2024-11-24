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
  title?: string;
  content?: string;
  images?: string[];
}

export interface CreateImageDTO {
  image: string;
  workId: string;
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
export interface ChallengeWorkWithImages extends ChallengeWork {
  images: WorkImage[];
}
