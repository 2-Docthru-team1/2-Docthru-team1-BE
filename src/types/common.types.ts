import type { Request as expressRequest } from 'express';
import type prismaClient from '#connection/postgres.connection.js';

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

export type ExtendedPrismaClient = typeof prismaClient;

export interface BasicOptions {
  orderBy: string;
  page: number;
  pageSize: number;
}
export interface BasicStringOptions {
  page: string;
  pageSize: string;
}
export interface BasicQueries {
  orderBy: string;
  page: string;
  pageSize: string;
}
