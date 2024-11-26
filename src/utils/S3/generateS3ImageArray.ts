import { getStorage } from '#middlewares/asyncLocalStorage.js';
import { generatePresignedUploadUrl } from './generate-presigned-upload-url.js';

export async function generateS3ImageArray(imageCount: number) {
  const storage = getStorage();
  const userId = storage.userId;
  const imagesData: { s3Key: string; uploadUrl: string }[] = [];
  for (let i = 0; i < imageCount; i++) {
    const uniqueFileName = `${userId}/${Date.now()}-image-${i}.jpg`;
    const s3Key = `${uniqueFileName}`;
    const contentType = 'image/jpeg';
    const expiresIn = 3600;
    const uploadUrl = await generatePresignedUploadUrl(s3Key, contentType, expiresIn);
    imagesData.push({ uploadUrl, s3Key });
  }
  return imagesData;
}
