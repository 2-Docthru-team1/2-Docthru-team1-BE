import type { NextFunction, Request, Response } from 'express';
import { HttpError } from '#types/http-error.types.js';
import HTTP_STATUS from '#utils/constants/http-status.js';
import { logErrorWithRequest } from '#utils/log.js';

export default function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  console.error(err);
  logErrorWithRequest(err, req);
  if (err instanceof HttpError) {
    res.status(err.status).send({ message: err.message });
  } else if (err.name === 'UnauthorizedError') {
    // NOTE express-jwt error
    res.status(HTTP_STATUS.UNAUTHORIZED).send({ message: err.message });
  } else {
    res.status(HTTP_STATUS.SERVER_ERROR).send({ message: err.message });
  }
}
