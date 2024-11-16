import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import fs from 'fs/promises';
import type { Readable } from 'stream';
import { awsRegion, bucketName } from '#configs/aws.config.js';
import { validateDownload } from '#utils/S3/verifyPath.js';

if (!awsRegion || bucketName) {
  throw new Error('필요한 환경변수가 지정되지 않았습니다.');
}

const s3 = new S3Client({ region: awsRegion });

async function streamToBuffer(stream: Readable): Promise<Buffer> {
  const chunks: Buffer[] = [];
  for await (const chunk of stream) {
    chunks.push(Buffer.from(chunk));
  }
  return Buffer.concat(chunks);
}

/**
 * S3로부터 파일을 다운로드
 *
 * @param {string} s3Key - S3상의 파일 경로
 * ex) folders/fileName.ext
 * @param {string} downloadPath - 다운로드 받을 로컬 경로명
 * ex) ./public/fileName.ext
 */
export default async function downloadFile(s3Key: string, downloadPath: string): Promise<void> {
  try {
    validateDownload(s3Key, downloadPath);

    const params = {
      Bucket: process.env.BUCKET_NAME,
      Key: s3Key,
    };

    const command = new GetObjectCommand(params);
    const response = await s3.send(command);

    if (!response.Body) {
      throw new Error('No data received from S3');
    }

    const fileBuffer = await streamToBuffer(response.Body as Readable);
    await fs.writeFile(downloadPath, fileBuffer);
    console.log('File downloaded successfully:', downloadPath);
  } catch (err) {
    console.error('Error downloading file:', err);
    throw err;
  }
}
