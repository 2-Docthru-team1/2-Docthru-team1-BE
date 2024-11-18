
import type { User as PrismaUser, Role } from '@prisma/client';

export interface User extends PrismaUser {
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
