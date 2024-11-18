import type { Request as expressRequest } from 'express';

export interface Request<T = { body: {}; query: {} }>
  extends expressRequest<
    {},
    {},
    T extends { body: infer BodyType } ? BodyType : {},
    T extends { query: infer QueryType } ? QueryType : {}
  > {}
