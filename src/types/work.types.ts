import type { ChallengeWork, WorkImage } from '@prisma/client';

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

export interface UpdateWorkDTO {
  title?: string;
  content?: string;
  imageCount?: number;
}

export interface UpdateWorkDTOWithUrls extends Omit<UpdateWorkDTO, 'imageCount'> {
  imagesData?: { s3Key: string; uploadUrl: string }[];
}

export interface WorkResponseWithUploadUrls {
  work: Omit<ChallengeWork, 'ownerId'>;
  uploadUrls: { uploadUrl: string }[];
}
export interface WorkCustomResponse extends Omit<ChallengeWork, 'ownerId'> {
  ownerId?: string | null;
  imagesData?: { s3Key: string; uploadUrl: string }[];
  imageCount?: number;
  imageUrls?: { imageUrl: string[] };
  uploadUrls?: { uploadUrl: string[] };
  images?: WorkImage[];
}
