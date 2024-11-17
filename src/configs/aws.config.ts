if (!process.env.AWS_ACCESS_KEY_ID) {
  throw new Error('AWS_ACCESS_KEY_ID 환경변수가 설정되지 않았습니다.');
}
if (!process.env.AWS_SECRET_ACCESS_KEY) {
  throw new Error('AWS_SECRET_ACCESS_KEY 환경변수가 설정되지 않았습니다.');
}
if (!process.env.AWS_REGION) {
  throw new Error('AWS_REGION 환경변수가 설정되지 않았습니다.');
}
if (!process.env.BUCKET_NAME) {
  throw new Error('BUCKET_NAME 환경변수가 설정되지 않았습니다.');
}

export const awsAccessKeyId = process.env.AWS_ACCESS_KEY_ID;
export const awsSecretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
export const awsRegion = process.env.AWS_REGION;

export const bucketName = process.env.BUCKET_NAME;
