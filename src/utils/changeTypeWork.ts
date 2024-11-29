import type { ChallengeWork } from '@prisma/client';

export function changeTypeWorkCreate(data: ChallengeWork & { imagesData: { s3Key: string; uploadUrl: string }[] }) {
  const { imagesData, ownerId, ...other } = data;
  const images = imagesData.map(data => ({ uploadUrl: data.uploadUrl }));
  const returnData = { ...other, images };
  return returnData;
}
