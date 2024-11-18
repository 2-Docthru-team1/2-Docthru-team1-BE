import type { NextFunction, Request, Response } from 'express';

export default function validatePaginationOptions(req: Request, res: Response, next: NextFunction) {
  const page = req.query.page;
  const pageSize = req.query.pageSize;
  const limit = req.query.limit;

  if (page && isNaN(Number(page))) throw new TypeError('page는 정수여야 합니다');
  if (pageSize && isNaN(Number(pageSize))) throw new TypeError('pageSize는 정수여야 합니다');
  if (limit && isNaN(Number(limit))) throw new TypeError('limit은 정수여야 합니다');

  next();
}
