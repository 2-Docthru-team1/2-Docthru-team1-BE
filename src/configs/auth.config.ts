if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET 환경변수가 설정되지 않았습니다.');
}

export const jwtSecret = process.env.JWT_SECRET;
export const jwtAccessExpiration = process.env.JWT_ACCESS_EXPIRATION || '1h';
export const jwtRefreshExpiration = process.env.JWT_REFRESH_EXPIRATION || '2w';
