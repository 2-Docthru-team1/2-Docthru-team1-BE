import type { ChallengeWork } from '@prisma/client';
import type { WorkCustomResponse } from '#types/work.types.js';

export function changeTypeWorkCreate(data: WorkCustomResponse) {
  const { imagesData, images, ownerId, ...other } = data;
  const uploadUrls = imagesData!.map(data => ({ uploadUrl: data.uploadUrl }));
  const returnData = { work: other, uploadUrls };
  return returnData;
}
