import type { Challenge, MediaType, PrismaClient, Status } from '@prisma/client';
import prismaClient from '#connection/postgres.connection.js';
import type { IChallengeRepository } from '#interfaces/repositories/challenge.repository.interface.js';
import type { ChallengeInput, getChallengesOptions } from '#types/challenge.types.js';
import { Order } from '#utils/constants/enum.js';

export class ChallengeRepository implements IChallengeRepository {
  private challenge: PrismaClient['challenge'];

  constructor(client: PrismaClient) {
    this.challenge = client.challenge;
  }

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
              { title: { contains: keyword, mode: 'insensitive' } },
              { description: { contains: keyword, mode: 'insensitive' } },
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
          { title: { contains: options.keyword, mode: 'insensitive' } },
          { description: { contains: options.keyword, mode: 'insensitive' } },
        ],
      }),
    };
    const totalCount = await this.challenge.count({ where: whereCondition });
    return totalCount;
  };

  findById = async (id: string): Promise<Challenge | null> => {
    return await prismaClient.challenge.findUnique({
      where: { id },
      include: {
        participants: true,
        works: true,
        abortReason: true,
      },
    });
  };

  create = async (data: ChallengeInput): Promise<Challenge> => {
    return await this.challenge.create({
      data: {
        ...data,
        participants: {
          connect: [{ id: data.participants[0].id }],
        },
      },
    });
  };

  // update = async (id: string, data: UpdateChallengeDTO): Promise<Challenge> => {
  //   const challenge = await this.challenge.update({ where: { id }, data });

  //   return challenge;
  // };

  // delete = async (id: string): Promise<Challenge> => {
  //   const challenge = await this.challenge.delete({ where: { id } });

  //   return challenge;
  // };
}
