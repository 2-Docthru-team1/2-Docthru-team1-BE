import type { Request as expressRequest } from 'express';

export interface IStorage {
  [key: string]: any;
}

export interface Request<T = { params: {}; response: {}; body: {}; query: {} }>
  extends expressRequest<
    T extends { params: infer ParamsType } ? ParamsType : {},
    T extends { response: infer ResponseType } ? ResponseType : {},
    T extends { body: infer BodyType } ? BodyType : {},
    T extends { query: infer QueryType } ? QueryType : {}
  > {}

export interface BasicOptions {
  orderBy: string;
  page: number;
  pageSize: number;
}
export interface BasicStringOptions {
  orderBy: string;
  page: string;
  pageSize: string;
}
export interface BasicQueries {
  orderBy: string;
  page: string;
  pageSize: string;
}
