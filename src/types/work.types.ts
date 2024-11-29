import type { ChallengeWork, WorkImage } from '@prisma/client';

// export type RequestCreateWorkDTO = Omit<CreateWorkDTO, 'challengeId' | 'ownerId'> & { imageCount: number };
export interface RequestCreateWorkDTO extends CreateWorkDTO {
  imageCount: number;
}

export type RepositoryCreateWorkDTO = Omit<CreateWorkDTO, 'imageCount'> & {
  uploadUrls: string[];
  challengeId: string;
  ownerId: string;
};

export interface GetWorksOptions {
  challengeId: string;
  page: number;
  pageSize: number;
}

export interface ChallengeWorkWithImages extends ChallengeWork {
  images: WorkImage[];
}

export type ResultChallengeWork = Omit<ChallengeWorkWithImages, 'ownerId'>;

export interface RequestCreateController {
  title: string;
  content: string;
  imageCount: number;
}

export interface RequestCreateService extends RequestCreateController {
  ownerId: string;
  challengeId: string;
}

/********************************************* */
export interface CreateWorkDTO {
  title: string;
  content: string;
  imageCount: number;
}

export interface CreateWorkDTOWithId extends CreateWorkDTO {
  challengeId: string;
}

export interface CreateWorkDTOWithS3Data extends Omit<CreateWorkDTOWithId, 'imageCount'> {
  imagesData: { uploadUrl: string; s3Key: string }[];
  userId: string;
}

export interface CreateWorkDTOWithUrls extends Omit<CreateWorkDTOWithId, 'imageCount'> {
  uploadUrls: string[];
}

export interface UpdateWorkDTO {
  title?: string;
  content?: string;
  imageCount?: number;
}

export interface UpdateWorkDTOWithUrls extends Omit<UpdateWorkDTO, 'imageCount'> {
  imagesData?: { s3Key: string; uploadUrl: string }[];
}

export interface WorkResponse extends Omit<ChallengeWork, 'ownerId' | 'images'> {
  images: { uploadUrl: string }[];
}

export interface UpdateWorkDTOWithOutOwnerId extends Omit<UpdateWorkDTO, 'ownerId'> {}
