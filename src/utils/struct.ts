import isEmail from 'is-email';
import isUuid from 'is-uuid';
import { define, object, optional } from 'superstruct';

enum Status {
  OPEN = 'OPEN',
  CLOSE = 'CLOSE',
}

enum Progress {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  DENIED = 'DENIED',
  CANCELED = 'CANCELED',
}

export const Uuid = define<string>('Uuid', (value: unknown) => isUuid.v4(value as string));
export const Email = define<string>('Email', (value: unknown) => isEmail(value as string));
export const Cursor = optional(Uuid);

export const CreateUser = object({});

export const PatchUser = object({});

export const CreateChallenge = object({});

export const PatchChallenge = object({});

export const CreateRequest = object({});

export const PatchRequest = object({});

export const CreateWork = object({});

export const PatchWork = object({});

export const CreateFeedback = object({});

export const PatchFeedback = object({});
