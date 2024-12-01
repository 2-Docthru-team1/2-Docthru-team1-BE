if (!process.env.DEEPL_API_KEY) {
  throw new Error('DEEPL_API_KEY 환경변수가 설정되지 않았습니다.');
}

export const deeplApiKey = process.env.DEEPL_API_KEY;