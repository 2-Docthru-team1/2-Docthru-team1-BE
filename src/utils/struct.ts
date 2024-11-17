import { Role } from '@prisma/client';
import isEmail from 'is-email';
import isUuid from 'is-uuid';
<<<<<<< HEAD
import { define, enums, object, optional, string } from 'superstruct';
=======
import { define, object, optional } from 'superstruct';
import type { SignInDTO } from '#types/user.types.js';
>>>>>>> f2265c9 (✨ Feat: 로그인 기능 개발중)

// prisma의 enum 타입을 js string[]로 변환
const roleEnumValues = Object.values(Role) as string[];

// js의 배열을 superstruct의 enum으로 변환
const structRole = enums(roleEnumValues);

export const Uuid = define<string>('Uuid', (value: unknown) => isUuid.v4(value as string));
export const Email = define<string>('Email', (value: unknown) => isEmail(value as string));
export const Cursor = optional(Uuid);

<<<<<<< HEAD
export const CreateUser = object({
  name: string(),
  email: Email,
  password: string(),
  salt: string(),
  role: optional(structRole),
});
=======
export const SignIn = define<SignInDTO>('SignIn', (value: unknown) => isSignIn(value as string));

export const CreateUser = object({});
>>>>>>> f2265c9 (✨ Feat: 로그인 기능 개발중)

export const PatchUser = object({});

export const CreateChallenge = object({});

export const PatchChallenge = object({});

export const CreateRequest = object({});

export const PatchRequest = object({});

export const CreateWork = object({});

export const PatchWork = object({});

export const CreateFeedback = object({});

export const PatchFeedback = object({});
