import type { Challenge, MediaType, PrismaClient, Status } from '@prisma/client';
import type { IChallengeRepository } from '#interfaces/repositories/challenge.repository.interface.js';
import type { CreateChallengeDTO, UpdateChallengeDTO, getChallengesOptions  } from '#types/challenge.types.js';
import { Order } from '#utils/constants/enum.js';
import prismaClient from '../connection/postgres.connection.js';

export class ChallengeRepository implements IChallengeRepository {
  private challenge: PrismaClient['challenge'];

  constructor(client: PrismaClient) {
    this.challenge = client.challenge; // 이 부분에 각 모델(스키마)를 연결합니다.
  }

  // 이 아래로 직접 DB와 통신하는 코드를 작성합니다.
  // 여기서 DB와 통신해 받아온 데이터를 위로(service로) 올려줍니다.
  findMany = async (options: getChallengesOptions): Promise<Challenge[] | null> => {
    const { status, mediaType, order, keyword, page, pageSize } = options;
    const orderBy: {
      deadline?: 'asc' | 'desc';
      createdAt?: 'asc' | 'desc';
    } = {};
    switch (order) {
      case Order.deadlineEarliest:
        orderBy.deadline = 'asc';
        break;
      case Order.deadlineLatest:
        orderBy.deadline = 'desc';
        break;
      case Order.earliestFirst:
        orderBy.createdAt = 'asc';
        break;
      default:
        orderBy.createdAt = 'desc';
    }
    const whereCondition: {
      mediaType?: MediaType;
      status?: Status;
      OR?: Array<{
        title?: { contains: string; mode: 'insensitive' };
        description?: { contains: string; mode: 'insensitive' };
      }>;
    } = {
      ...(mediaType ? { mediaType } : {}),
      ...(status ? { status } : {}),
      ...(keyword
        ? {
            OR: [
              { title: { contains: keyword, mode: 'insensitive' } }, // title에서 키워드 검색
              { description: { contains: keyword, mode: 'insensitive' } }, // description에서 키워드 검색
            ],
          }
        : {}),
    };
    const challenges = await this.challenge.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
      where: whereCondition,
      orderBy,
    });
    return challenges;
  };

  totalCount = async (options: getChallengesOptions): Promise<number | null> => {
    const { status, mediaType, keyword } = options;
    const whereCondition: {
      mediaType?: MediaType;
      status?: Status;
      OR?: Array<{
        title?: { contains: string; mode: 'insensitive' };
        description?: { contains: string; mode: 'insensitive' };
      }>;
    } = {
      ...(mediaType ? { mediaType } : {}),
      ...(status ? { status } : {}),
      ...(keyword && {
        OR: [
          { title: { contains: options.keyword, mode: 'insensitive' } }, // title에서 키워드 검색
          { description: { contains: options.keyword, mode: 'insensitive' } }, // description에서 키워드 검색
        ],
      }),
    };
    const totalCount = await this.challenge.count({ where: whereCondition });
    return totalCount;
  };

  findById = async (id: string): Promise<Challenge | null> => {
    return await prismaClient.challenge.findUnique({ where: { id } });
  };

  create = async (data: CreateChallengeDTO): Promise<Challenge> => {
    const challenge = await this.challenge.create({ data });

    return challenge;
  };

  update = async (id: string, data: UpdateChallengeDTO): Promise<Challenge> => {
    const challenge = await this.challenge.update({ where: { id }, data });

    return challenge;
  };

  delete = async (id: string): Promise<Challenge> => {
    const challenge = await this.challenge.delete({ where: { id } });

    return challenge;
  };
}
