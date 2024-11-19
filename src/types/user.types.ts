import type { User as PrismaUser, Role } from '@prisma/client';

// NOTE Omit: 특정 필드를 제외한 타입 생성, 이 경우 PrismaUser 타입에서 password, salt, refreshToken 필드를 제외한 타입
export interface SafeUser extends Omit<PrismaUser, 'password' | 'salt' | 'refreshToken'> {
  accessToken?: string;
}
export interface User extends PrismaUser {
  accessToken?: string;
}

export interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
  salt: string;
  role?: Role;
  refreshToken: string | '';
}

export interface UpdateUserDTO {
  name?: string;
  password?: string;
}

export interface SignInDTO {
  email: string;
  password: string;
}
