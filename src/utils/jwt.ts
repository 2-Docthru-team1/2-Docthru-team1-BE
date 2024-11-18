import { sign } from 'jsonwebtoken';
import { JWT_ACCESS_EXPIRATION, JWT_SECRET } from '#configs/jwt.config.js';

// 액세스 토큰 생성
export const generateAccessToken = (user: { id: string; email: string }): string => {
  if (!JWT_SECRET) {
    throw new Error('필요한 환경변수가 지정되지 않았습니다.');
  }

  return sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: JWT_ACCESS_EXPIRATION });
};
