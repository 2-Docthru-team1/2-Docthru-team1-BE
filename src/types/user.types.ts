import type { User as PrismaUser } from '@prisma/client';

export interface User extends PrismaUser {
  accessToken?: string;
}

// NOTE Omit: 특정 필드를 제외한 타입 생성, 이 경우 User 타입에서 password, salt, refreshToken 필드를 제외한 타입
export interface SafeUser extends Omit<User, 'password' | 'salt' | 'refreshToken'> {}
