if (!process.env.PORT) {
  throw new Error('PORT 환경변수가 설정되지 않았습니다.');
}

export const port = process.env.PORT;
