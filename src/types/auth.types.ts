import type { Role } from '@prisma/client';
import type { SafeUser } from '#types/user.types.js';

export interface UserToken {
  userId: string;
  iat: number;
  exp: number;
}

export interface SigninResponse extends SafeUser {
  refreshToken: string;
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
