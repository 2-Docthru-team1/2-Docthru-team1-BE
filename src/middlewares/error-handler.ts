import type { NextFunction, Request, Response } from 'express';
import HTTP_STATUS from '#utils/constants/http-status.js';

export default function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  console.error(err);
  res.status(HTTP_STATUS.SERVER_ERROR).send({ message: err.message });
}
