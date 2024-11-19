import { AsyncLocalStorage } from 'async_hooks';
import type { NextFunction, Request, Response } from 'express';
import { type IStorage } from '#types/common.types.js';

export const asyncLocalStorage = new AsyncLocalStorage();

// NOTE storage는 asyncLocalStorage에 저장되는 객체로, asyncLocalStorage.getStore()로 접근할 수 있음
const storage: IStorage = {};

export const runAsyncLocalStorage = (req: Request, res: Response, next: NextFunction) => {
  asyncLocalStorage.run(storage, async () => await next());
};
