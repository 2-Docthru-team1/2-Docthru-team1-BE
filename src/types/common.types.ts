import type { Request } from 'express';

export interface RequestBody<T> extends Request {
  body: T;
}

export interface IStorage {
  [key: string]: any;
}
