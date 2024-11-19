// verifyPath.ts
import path from 'path';

interface PathVerificationResult {
  isValid: boolean;
  error?: string;
}

/**
 * S3 키 경로가 유효한지 검증합니다.
 * - 빈 문자열이 아니어야 함
 * - 파일명이 포함되어야 함 (확장자 체크)
 * - 시작이나 끝에 '/'가 없어야 함
 */
export function verifyS3Key(s3Key: string): PathVerificationResult {
  try {
    // 빈 문자열 체크
    if (!s3Key?.trim()) {
      return {
        isValid: false,
        error: 'S3 key cannot be empty',
      };
    }

    // 시작이나 끝의 '/' 체크
    if (s3Key.startsWith('/') || s3Key.endsWith('/')) {
      return {
        isValid: false,
        error: 'S3 key should not start or end with /',
      };
    }

    // 파일명 포함 여부 체크 (확장자 존재 여부)
    if (!path.extname(s3Key)) {
      return {
        isValid: false,
        error: 'S3 key must include a file name with extension',
      };
    }

    return { isValid: true };
  } catch (err) {
    return {
      isValid: false,
      error: `Invalid S3 key: ${err instanceof Error ? err.message : 'Unknown error'}`,
    };
  }
}

/**
 * 로컬 다운로드 경로가 유효한지 검증합니다.
 * - 빈 문자열이 아니어야 함
 * - 파일명이 포함되어야 함 (확장자 체크)
 * - 절대 경로로 변환 가능해야 함
 */
export function verifyDownloadPath(downloadPath: string): PathVerificationResult {
  try {
    // 빈 문자열 체크
    if (!downloadPath?.trim()) {
      return {
        isValid: false,
        error: 'Download path cannot be empty',
      };
    }

    // 파일명 포함 여부 체크 (확장자 존재 여부)
    if (!path.extname(downloadPath)) {
      return {
        isValid: false,
        error: 'Download path must include a file name with extension',
      };
    }

    // 절대 경로로 변환 가능 여부 체크
    path.resolve(downloadPath);

    return { isValid: true };
  } catch (err) {
    return {
      isValid: false,
      error: `Invalid download path: ${err instanceof Error ? err.message : 'Unknown error'}`,
    };
  }
}

/**
 * 파일명이 유효한지 검증합니다.
 * - 빈 문자열이 아니어야 함
 * - 확장자가 포함되어야 함
 * - 허용된 확장자여야 함
 * - 허용된 문자만 포함해야 함
 */
export function verifyFileName(fileName: string, allowedExtensions?: string[]): PathVerificationResult {
  try {
    // 빈 문자열 체크
    if (!fileName?.trim()) {
      return {
        isValid: false,
        error: 'File name cannot be empty',
      };
    }

    // 파일명에 허용되지 않는 문자 체크
    const invalidChars = /[<>:"/\\|?*\x00-\x1F]/g;
    if (invalidChars.test(fileName)) {
      return {
        isValid: false,
        error: 'File name contains invalid characters',
      };
    }

    // 확장자 체크
    const ext = path.extname(fileName).toLowerCase();
    if (!ext) {
      return {
        isValid: false,
        error: 'File must have an extension',
      };
    }

    // 허용된 확장자 체크 (지정된 경우)
    if (allowedExtensions && allowedExtensions.length > 0) {
      if (!allowedExtensions.includes(ext)) {
        return {
          isValid: false,
          error: `File extension must be one of: ${allowedExtensions.join(', ')}`,
        };
      }
    }

    return { isValid: true };
  } catch (err) {
    return {
      isValid: false,
      error: `Invalid file name: ${err instanceof Error ? err.message : 'Unknown error'}`,
    };
  }
}

export function validateDownload(s3Key: string, downloadPath: string): void {
  const s3KeyValidation = verifyS3Key(s3Key);
  const downloadPathValidation = verifyDownloadPath(downloadPath);

  if (!s3KeyValidation.isValid) {
    throw new Error(`Invalid S3 key: ${s3KeyValidation.error}`);
  }

  if (!downloadPathValidation.isValid) {
    throw new Error(`Invalid download path: ${downloadPathValidation.error}`);
  }
}

// 파일 업로드에 관련된 타입들
export interface FileUploadConfig {
  allowedExtensions?: string[];
  allowedMimeTypes?: string[];
  maxSizeMB?: number;
  prefix?: string;
}

/**
 * 파일 업로드 설정을 기반으로 파일 정보를 검증합니다.
 */
export function validateFileUpload(
  fileName: string,
  contentType: string,
  sizeInBytes: number,
  config: FileUploadConfig,
): PathVerificationResult {
  // 파일명 검증
  const fileNameResult = verifyFileName(fileName, config.allowedExtensions);
  if (!fileNameResult.isValid) {
    return fileNameResult;
  }

  // MIME 타입 검증
  if (config.allowedMimeTypes && !config.allowedMimeTypes.includes(contentType)) {
    return {
      isValid: false,
      error: `Content type must be one of: ${config.allowedMimeTypes.join(', ')}`,
    };
  }

  // 파일 크기 검증
  if (config.maxSizeMB && sizeInBytes > config.maxSizeMB * 1024 * 1024) {
    return {
      isValid: false,
      error: `File size must not exceed ${config.maxSizeMB}MB`,
    };
  }

  return { isValid: true };
}
