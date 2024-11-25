import type { ChallengeWork, WorkImage } from '@prisma/client';
import type { CreateWorkDTOWithS3Data } from '#types/work.types.js';

export function chageTypeWorkCreate(data: ChallengeWork & { imagesData: { s3Key: string; uploadUrl: string }[] }) {
  const { imagesData, ownerId, ...ohter } = data;
  const images = imagesData.map(data => ({ uploadUrl: data.uploadUrl }));
  const returnData = { ...ohter, images };
  return returnData;
}
