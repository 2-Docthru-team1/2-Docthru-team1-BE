import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { awsRegion, bucketName } from '#configs/aws.config.js';
import { type FileUploadConfig, validateFileUpload } from '#utils/verifyPath.js';

if (!awsRegion || !bucketName) {
  throw new Error('Required environment variables are not set');
}

const s3 = new S3Client({ region: awsRegion });

// 기본 업로드 설정
const defaultUploadConfig: FileUploadConfig = {
  allowedExtensions: ['.jpg', '.jpeg', '.png'],
  allowedMimeTypes: ['image/jpeg', 'image/png'],
  maxSizeMB: 100,
  prefix: 'uploads',
};

interface PresignedUrlResult {
  uploadUrl: string;
  key: string;
}

export async function generateUploadPresignedUrl(
  fileName: string,
  contentType: string,
  sizeInBytes: number,
  config: FileUploadConfig = defaultUploadConfig,
  expiresIn: number = 300,
): Promise<PresignedUrlResult> {
  try {
    // 파일 정보 검증
    const validationResult = validateFileUpload(fileName, contentType, sizeInBytes, config);
    if (!validationResult.isValid) {
      throw new Error(validationResult.error);
    }

    // 유니크한 파일명 생성
    const uniqueFileName = `${Date.now()}-${fileName}`;

    // S3 key 생성
    const key = config.prefix ? `${config.prefix}/${uniqueFileName}` : uniqueFileName;

    const command = new PutObjectCommand({
      Bucket: process.env.BUCKET_NAME,
      Key: key,
      ContentType: contentType,
    });

    const uploadUrl = await getSignedUrl(s3, command, {
      expiresIn,
      signableHeaders: new Set(['content-type', 'content-length']),
    });

    return {
      uploadUrl,
      key,
    };
  } catch (err) {
    console.error('Error generating presigned URL:', err);
    throw err;
  }
}
