import { type MediaType, Status } from '@prisma/client';
import type { NextFunction, Response } from 'express';
import type { ChallengeService } from '#services/challenge.service.js';
import type {
  CreateChallengeDTO,
  GetChallengesQuery,
  UpdateChallengeDTO,
  UpdateChallengeStatusDTO,
} from '#types/challenge.types.js';
import type { Request } from '#types/common.types.js';
import { BadRequest } from '#types/http-error.types.js';
import { Order } from '#utils/constants/enum.js';
import MESSAGES from '#utils/constants/messages.js';

export class ChallengeController {
  constructor(private challengeService: ChallengeService) {}

  getChallenges = async (req: Request<{ query: GetChallengesQuery }>, res: Response, next: NextFunction) => {
    const { status, mediaType, orderBy = 'latestFirst', keyword = '', page = '1', pageSize = '4' } = req.query;
    const inactiveStatus: Status[] = [Status.aborted, Status.canceled, Status.denied, Status.pending];
    let mediaTypeEnum;
    if (Array.isArray(mediaType)) {
      mediaTypeEnum = mediaType as MediaType[];
    } else if (mediaType?.length) {
      mediaTypeEnum = [mediaType] as MediaType[];
    } else {
      mediaTypeEnum = undefined;
    }

    let statusEnum;
    if (Array.isArray(status)) {
      statusEnum = status as Status[];
    } else if (status?.length) {
      statusEnum = [status] as Status[];
    } else {
      statusEnum = [Status.onGoing, Status.finished] as Status[];
    }
    if (statusEnum && statusEnum.some(status => inactiveStatus.includes(status))) {
      throw new BadRequest(MESSAGES.BAD_REQUEST_STATUS);
    }
    const orderEnum = orderBy as Order;
    const options = {
      status: statusEnum,
      mediaType: mediaTypeEnum,
      orderBy: orderEnum,
      page: Number(page),
      pageSize: Number(pageSize),
      keyword,
    };
    const { totalCount, list } = await this.challengeService.getChallenges(options);
    res.json({ totalCount, list });
  };
  getRequestChallenges = async (req: Request<{ query: GetChallengesQuery }>, res: Response, next: NextFunction) => {
    const { filter, keyword = '', page = '1', pageSize = '10' } = req.query;
    let statusEnum;
    let orderEnum;
    switch (filter) {
      case 'pending':
        statusEnum = [Status.pending];
        break;
      case 'approved':
        statusEnum = [Status.onGoing, Status.finished];
        break;
      case 'denied':
        statusEnum = [Status.denied];
        break;
      case Order.deadlineEarliest:
        orderEnum = Order.deadlineEarliest;
        break;
      case Order.deadlineLatest:
        orderEnum = Order.deadlineLatest;
        break;
      case Order.earliestFirst:
        orderEnum = Order.earliestFirst;
        break;
      case Order.latestFirst:
        orderEnum = Order.latestFirst;
        break;
    }
    if (orderEnum === undefined) {
      orderEnum = Order.latestFirst;
    }
    const options = {
      status: statusEnum,
      orderBy: orderEnum,
      page: Number(page),
      pageSize: Number(pageSize),
      keyword,
    };
    const { totalCount, list } = await this.challengeService.getChallenges(options);
    res.json({ totalCount, list });
  };
  getMyParticipations = async (req: Request<{ query: GetChallengesQuery }>, res: Response, next: NextFunction) => {
    const { status, orderBy = 'latestFirst', keyword = '', page = '1', pageSize = '10' } = req.query;
    const participantId = req.user?.userId;

    let statusEnum;
    if (status === 'onGoing' || status === 'finished') {
      statusEnum = [status] as Status[];
    } else {
      throw new BadRequest(MESSAGES.BAD_REQUEST);
    }
    const orderEnum = orderBy as Order;

    const options = {
      status: statusEnum,
      orderBy: orderEnum,
      page: Number(page),
      pageSize: Number(pageSize),
      keyword,
      participantId,
    };

    const { totalCount, list } = await this.challengeService.getChallenges(options);

    res.json({ totalCount, list });
  };

  getMyRequests = async (req: Request<{ query: GetChallengesQuery }>, res: Response, next: NextFunction) => {
    const { status, orderBy = 'latestFirst', keyword = '', page = '1', pageSize = '10' } = req.query;
    const requestUserId = req.user?.userId;

    let statusEnum;
    if (status === 'Approved') {
      statusEnum = ['onGoing', 'finished'] as Status[];
    } else if (Array.isArray(status)) {
      statusEnum = status as Status[];
    } else if (status?.length) {
      statusEnum = [status] as Status[];
    } else {
      statusEnum = undefined;
    }
    // const statusEnum = status ? (status as Status) : undefined;
    const orderEnum = orderBy as Order;

    const options = {
      status: statusEnum,
      orderBy: orderEnum,
      page: Number(page),
      pageSize: Number(pageSize),
      keyword,
      requestUserId,
    };
    const { list, totalCount } = await this.challengeService.getChallenges(options);
    res.json({ totalCount, list });
  };

  getChallengeById = async (req: Request<{ params: { id: string } }>, res: Response) => {
    const { id } = req.params;
    const challenge = await this.challengeService.getChallengeById(id);
    res.json(challenge);
  };

  postChallenge = async (req: Request<{ body: CreateChallengeDTO }>, res: Response) => {
    const challengeData = req.body;
    const newChallenge = await this.challengeService.createChallenge(challengeData);
    res.status(201).json(newChallenge);
  };

  patchChallenge = async (req: Request<{ params: { id: string }; body: UpdateChallengeDTO }>, res: Response) => {
    const { id } = req.params;
    const updateChallenge = await this.challengeService.updateChallenge(id, req.body);
    res.json(updateChallenge);
  };

  patchChallengeStatus = async (req: Request<{ params: { id: string }; body: UpdateChallengeStatusDTO }>, res: Response) => {
    const { id: challengeId } = req.params;
    const { status, abortReason } = req.body;
    const updatedChallenge = await this.challengeService.updateStatus({
      challengeId,
      status,
      abortReason,
    });
    res.json(updatedChallenge);
  };

  getChallengeAbortReason = async (req: Request<{ params: { id: string } }>, res: Response) => {
    const { id } = req.params;
    const abortReason = await this.challengeService.getAbortReason(id);
    res.json(abortReason);
  };
}
