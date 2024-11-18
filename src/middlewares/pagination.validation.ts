import type { NextFunction, Request, Response } from 'express';

export default function validatePaginationOptions(req: Request, res: Response, next: NextFunction) {
  const page = req.query.page;
  const pageSize = req.query.pageSize;
  const limit = req.query.limit;

  if (page && isNaN(Number(page))) throw new TypeError('page should be an integer');
  if (pageSize && isNaN(Number(pageSize))) throw new TypeError('pageSize should be an integer');
  if (limit && isNaN(Number(limit))) throw new TypeError('limit should be an integer');

  next();
}
