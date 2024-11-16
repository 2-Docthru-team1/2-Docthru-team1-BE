import type { Language } from '@prisma/client';
import type { BaseModel } from './common.types.js';

export interface User extends BaseModel {
  name: string;
  email: string;
  password: string;
  refreshToken: string;
  language: Language;
  roleId: string;
}

interface Role extends BaseModel {
  name: string;
}

interface Permission extends BaseModel {
  name: string;
  description: string;
}

export interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
}

export interface UpdateUserDTO {
  name?: string;
  password?: string;
}
