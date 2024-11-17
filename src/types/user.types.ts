import type { Role } from '@prisma/client';
import type { BaseModel } from './common.types.js';

export interface User extends BaseModel {
  name: string;
  email: string;
  password: string;
  salt: string;
  refreshToken: string | null;
  role: Role;
  accessToken?: string;
}

export interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
  salt: string;
  role: Role | undefined;
}

export interface UpdateUserDTO {
  name?: string;
  password?: string;
}
