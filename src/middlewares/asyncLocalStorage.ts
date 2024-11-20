import { AsyncLocalStorage } from 'async_hooks';
import type { NextFunction, Request, Response } from 'express';
import { type IStorage } from '#types/common.types.js';
import { InternalServerError } from '#types/http-error.types.js';
import MESSAGES from '#utils/constants/messages.js';

export const asyncLocalStorage = new AsyncLocalStorage<IStorage>();

// NOTE storage는 asyncLocalStorage에 저장되는 객체로, asyncLocalStorage.getStore()로 접근할 수 있음
const storage: IStorage = {};

export const runAsyncLocalStorage = (req: Request, res: Response, next: NextFunction) => {
  asyncLocalStorage.run(storage, async () => await next());
};

// NOTE 타입 검증하고 간단하게 사용하기 위한 get함수
export const getStorage = (): IStorage => {
  const store = asyncLocalStorage.getStore();
  if (!store) {
    throw new InternalServerError(MESSAGES.INTERNAL_ERROR);
  }

  return store;
};
