import { Role } from '@prisma/client';
import isEmail from 'is-email';
import isUuid from 'is-uuid';
import { define, enums, integer, number, object, optional, partial, size, string } from 'superstruct';

// prisma의 enum 타입을 js string[]로 변환
const roleEnumValues = Object.values(Role) as string[];

// js의 배열을 superstruct의 enum으로 변환
const structRole = enums(roleEnumValues);

export const Uuid = define<string>('Uuid', (value: unknown) => isUuid.v4(value as string));
export const Email = define<string>('Email', (value: unknown) => isEmail(value as string));
export const Cursor = optional(Uuid);

export const CreateUser = object({
  name: string(),
  email: Email,
  password: string(),
  salt: string(),
  role: optional(structRole),
});

export const SignIn = object({
  email: Email,
  password: string(),
});

export const PatchUser = object({});

const urlRegex = /^(https?:\/\/[^\s$.?#].[^\s]*)$/;
export const Url = define<string>('Url', value => {
  if (typeof value !== 'string') {
    return false;
  }
  return urlRegex.test(value);
});

const ISO8601Regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?Z$/;
export const ISO8601String = define<string>('ISO8601String', value => {
  if (typeof value !== 'string') {
    return false;
  }
  return ISO8601Regex.test(value);
});

export const MediaType = enums(['youtube', 'blog', 'recipeWeb', 'socialMedia']);

export const CreateChallenge = object({
  title: string(),
  description: string(),
  deadline: ISO8601String,
  embedUrl: Url,
  mediaType: MediaType,
  imageCount: number(),
});

export const PatchChallenge = partial(CreateChallenge);

export const CreateRequest = object({});

export const PatchRequest = object({});

export const CreateWork = object({
  title: string(),
  content: string(),
  imageCount: size(integer(), 1, 2),
});
export const PatchWork = partial(CreateWork);

export const CreateFeedback = object({
  content: string(),
  ownerId: Uuid,
  workId: Uuid,
});

export const PatchFeedback = object({
  content: string(),
});
