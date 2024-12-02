import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import { runAsyncLocalStorage } from '#middlewares/asyncLocalStorage.js';
import validatePaginationOptions from '#middlewares/pagination.validation.js';

export default function setupMiddlewares(app: express.Application) {
  app.use(express.json());
  app.use(cors({ credentials: true, origin: '*' }));
  app.use(cookieParser());
  app.use(validatePaginationOptions);
  app.use(runAsyncLocalStorage);

  app.use((req, res, next) => {
    console.log(`Request Path: ${req.path}`);
    console.log(`Request Method: ${req.method}`);
    next();
  });
}
