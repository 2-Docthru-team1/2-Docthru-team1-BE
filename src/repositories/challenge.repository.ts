import type { AbortReason, Challenge, MediaType, Status } from '@prisma/client';
import baseClient from '#connection/postgres.connection.js';
import type { IChallengeRepository } from '#interfaces/repositories/challenge.repository.interface.js';
import type { ChallengeInput, ChallengeStatusInput, UpdateChallengeDTO, getChallengesOptions } from '#types/challenge.types.js';
import type { ExtendedPrismaClient } from '#types/common.types.js';
import { Order } from '#utils/constants/enum.js';

export class ChallengeRepository implements IChallengeRepository {
  private challenge: ExtendedPrismaClient['challenge'];
  private abortReason: ExtendedPrismaClient['abortReason'];

  constructor(client: ExtendedPrismaClient) {
    this.challenge = client.challenge;
    this.abortReason = client.abortReason;
  }

  findMany = async (options: getChallengesOptions): Promise<Challenge[] | null> => {
    const { status, mediaType, orderBy, keyword, page, pageSize, admin, requestUserId, participantId } = options;
    const applyOrderBy: {
      deadline?: 'asc' | 'desc';
      createdAt?: 'asc' | 'desc';
    } = {};
    switch (orderBy) {
      case Order.deadlineEarliest:
        applyOrderBy.deadline = 'asc';
        break;
      case Order.deadlineLatest:
        applyOrderBy.deadline = 'desc';
        break;
      case Order.earliestFirst:
        applyOrderBy.createdAt = 'asc';
        break;
      default:
        applyOrderBy.createdAt = 'desc';
    }
    const whereCondition: {
      mediaType?: { in: MediaType[] };
      status?: { in: Status[] };
      title?: { contains: string };
      isHidden?: boolean;
    } = {
      ...(Array.isArray(mediaType) ? { mediaType: { in: mediaType } } : {}),
      ...(Array.isArray(status) ? { status: { in: status } } : {}),
      // ...(status ? { status } : {}),
      ...(keyword ? { title: { contains: keyword } } : {}),
      ...(admin ? {} : { isHidden: false }),
      ...(requestUserId ? { requestUserId } : {}),
      ...(participantId ? { participants: { some: { id: participantId } } } : {}),
    };

    const challenges = await this.challenge.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
      where: whereCondition,
      orderBy: applyOrderBy,
      include: { requestUser: { select: { id: true, name: true } } },
    });
    return challenges;
  };

  totalCount = async (options: getChallengesOptions): Promise<number | null> => {
    const { status, mediaType, keyword, admin, requestUserId, participantId } = options;
    const whereCondition: {
      mediaType?: { in: MediaType[] };
      status?: { in: Status[] };
      // status?: Status;
      title?: { contains: string };
      isHidden?: boolean;
    } = {
      ...(Array.isArray(mediaType) ? { mediaType: { in: mediaType } } : {}),
      ...(Array.isArray(status) ? { status: { in: status } } : {}),
      // ...(status ? { status } : {}),
      ...(keyword ? { title: { contains: keyword } } : {}),
      ...(admin ? {} : { isHidden: false }),
      ...(requestUserId ? { requestUserId } : {}),
      ...(participantId ? { participants: { some: { id: participantId } } } : {}),
    };
    const totalCount = await this.challenge.count({ where: whereCondition });
    return totalCount;
  };

  findById = async (id: string): Promise<Challenge | null> => {
    return await baseClient.challenge.findUnique({
      where: { id },
      include: {
        participants: { select: { id: true } },
        requestUser: { select: { id: true, name: true } },
      },
    });
  };

  create = async (data: ChallengeInput): Promise<Challenge> => {
    return await this.challenge.create({
      data: {
        ...data,
      },
      include: {
        requestUser: { select: { id: true, name: true } },
      },
    });
  };

  update = async (id: string, data: UpdateChallengeDTO): Promise<Challenge> => {
    const challenge = await this.challenge.update({
      where: { id },
      data,
      include: {
        requestUser: { select: { id: true, name: true } },
      },
    });
    return challenge;
  };

  updateStatus = async (data: ChallengeStatusInput): Promise<Challenge> => {
    const { challengeId, status, abortReason, userId } = data;
    const newStatus = { status };
    if (abortReason && ['denied', 'aborted'].includes(status)) {
      await this.abortReason.upsert({
        where: { challengeId },
        create: {
          content: abortReason,
          adminId: userId,
          challengeId,
        },
        update: {
          content: abortReason,
          adminId: userId,
        },
      });
    }
    return await this.challenge.update({
      where: { id: challengeId },
      data: newStatus,
      include: {
        requestUser: { select: { id: true, name: true } },
      },
    });
  };

  findAbortReason = async (id: string): Promise<AbortReason | null> => {
    return await this.abortReason.findUnique({
      where: { challengeId: id },
    });
  };
}
