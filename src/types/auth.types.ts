import type { Role } from '@prisma/client';

export interface UserToken {
  userId: string;
  iat: number;
  exp: number;
}

export interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
  salt: string;
  role?: Role;
  refreshToken: string | '';
}

export interface SignInDTO {
  email: string;
  password: string;
  salt: string;
}
