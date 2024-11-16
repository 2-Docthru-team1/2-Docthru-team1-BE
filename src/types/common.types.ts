import type { Request } from 'express';

export interface BaseModel {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export interface RequestBody<T> extends Request {
  body: T;
}
