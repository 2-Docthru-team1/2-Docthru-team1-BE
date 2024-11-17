import type { NextFunction, Request, Response } from 'express';

export function errorCatchHandler(handler: (req: Request, res: Response, next: NextFunction) => Promise<any>) {
  return async function (req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await handler(req, res, next);
    } catch (error) {
      next(error);
    }
  };
}
