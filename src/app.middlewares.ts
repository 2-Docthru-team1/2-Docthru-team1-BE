import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import { runAsyncLocalStorage } from '#middlewares/asyncLocalStorage.js';
import loggerMiddleware from '#middlewares/loggerMiddleware.js';
import validatePaginationOptions from '#middlewares/pagination.validation.js';
import { storeClientIp } from '#middlewares/storeClientIP.js';

export default function setupMiddlewares(app: express.Application) {
  app.use(express.json());
  app.use(cors({ credentials: true, origin: true }));
  app.use(cookieParser());
  app.use(validatePaginationOptions);
  app.use(runAsyncLocalStorage);
  app.use(storeClientIp);
  app.use(loggerMiddleware);

  app.use((req, res, next) => {
    console.log(`Request Path: ${req.path}`);
    console.log(`Request Method: ${req.method}`);
    next();
  });
}
