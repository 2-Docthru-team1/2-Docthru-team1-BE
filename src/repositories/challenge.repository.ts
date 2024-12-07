import { type AbortReason, type Challenge, type MediaType, MonthlyType, type Status } from '@prisma/client';
import baseClient from '#connection/postgres.connection.js';
import type { IChallengeRepository } from '#interfaces/repositories/challenge.repository.interface.js';
import type {
  ChallengeInput,
  ChallengeStatusInput,
  ChallengeWithParticipants,
  GetMonthlyChallengeOption,
  UpdateChallengeDTO,
  getChallengesOptions,
} from '#types/challenge.types.js';
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
    const { status, mediaType, orderBy, keyword, page = 1, pageSize = 4, admin, requestUserId, participantId } = options;

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
      monthly: MonthlyType | null;
    } = {
      ...(Array.isArray(mediaType) ? { mediaType: { in: mediaType } } : {}),
      ...(Array.isArray(status) ? { status: { in: status } } : {}),
      ...(keyword ? { title: { contains: keyword } } : {}),
      ...(admin ? {} : { isHidden: false }),
      ...(requestUserId ? { requestUserId } : {}),
      ...(participantId ? { participants: { some: { id: participantId } } } : {}),
      monthly: null,
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
    const { status, mediaType, keyword, admin, requestUserId, participantId, allRecords } = options;

    const whereCondition: {
      mediaType?: { in: MediaType[] };
      status?: { in: Status[] };
      title?: { contains: string };
      isHidden?: boolean;
      monthly: MonthlyType | null;
    } = {
      ...(Array.isArray(mediaType) ? { mediaType: { in: mediaType } } : {}),
      ...(Array.isArray(status) ? { status: { in: status } } : {}),
      ...(keyword ? { title: { contains: keyword } } : {}),
      ...(admin ? {} : { isHidden: false }),
      ...(requestUserId ? { requestUserId } : {}),
      ...(participantId ? { participants: { some: { id: participantId } } } : {}),
      monthly: null,
    };

    // NOTE allRecords일 경우 모든 레코드를 카운트
    const totalCount = await this.challenge.count({ where: allRecords ? { deletedAt: undefined } : whereCondition });

    return totalCount;
  };

  findById = async (id: string): Promise<Challenge | null> => {
    const challenge = await baseClient.challenge.findUnique({
      where: { id },
      include: {
        participants: { select: { id: true } },
        requestUser: { select: { id: true, name: true } },
      },
    });

    return challenge;
  };

  findByNumber = async (number: number): Promise<Challenge | null> => {
    const challenge = await this.challenge.findUnique({
      where: { number },
      include: {
        participants: { select: { id: true } },
        requestUser: { select: { id: true, name: true } },
      },
    });

    return challenge;
  };

  findBiggestNumber = async (): Promise<number> => {
    const challenge = await this.challenge.findMany({
      orderBy: { number: 'desc' },
      take: 1,
    });

    return challenge[0]?.number || 0;
  };

  create = async (data: ChallengeInput): Promise<Challenge> => {
    const challenge = await this.challenge.create({
      data: {
        ...data,
      },
      include: {
        requestUser: { select: { id: true, name: true } },
      },
    });

    return challenge;
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

    const challenge = await this.challenge.update({
      where: { id: challengeId },
      data: newStatus,
      include: {
        requestUser: { select: { id: true, name: true } },
      },
    });

    return challenge;
  };

  findAbortReason = async (id: string): Promise<AbortReason | null> => {
    const abortReason = await this.abortReason.findUnique({
      where: { challengeId: id },
    });

    return abortReason;
  };

  findMonthlyChallenge = async (option: GetMonthlyChallengeOption, currentYear: number): Promise<Challenge[] | null> => {
    const challenge = await this.challenge.findMany({
      where: {
        monthly: option.monthly,
        createdAt: {
          gte: new Date(`${currentYear}-01-01T00:00:00Z`),
          lt: new Date(`${currentYear + 1}-01-01T00:00:00Z`),
        },
      },
      include: { requestUser: { select: { id: true, name: true } } },
      take: 3,
    });

    return challenge;
  };

  // socket
  findChallengesToFinish = async (): Promise<ChallengeWithParticipants[]> => {
    const now = new Date();
    return await this.challenge.findMany({
      where: {
        deadline: { lte: now },
        status: { in: ['pending', 'onGoing'] },
      },
      include: {
        participants: { select: { id: true } },
      },
    });
  };

  updateChallengesToFinished = async (challengeIds: string[]): Promise<Challenge[]> => {
    const updatedChallenges: Challenge[] = [];
    for (const id of challengeIds) {
      const challenge = await this.challenge.update({
        where: { id },
        data: { status: 'finished' },
      });
      updatedChallenges.push(challenge);
    }
    return updatedChallenges;
  };
}
