import type { MediaType, Status } from '@prisma/client';
import type { NextFunction, Request, Response } from 'express';
import { getStorage } from '#middlewares/asyncLocalStorage.js';
import type { ChallengeService } from '#services/challenge.service.js';
import type {
  CreateChallengeDTO,
  GetChallengesQuery,
  UpdateChallengeDTO,
  UpdateChallengeStatusDTO,
} from '#types/challenge.types.js';
import { Order } from '#utils/constants/enum.js';

export class ChallengeController {
  constructor(private challengeService: ChallengeService) {}

  getChallenges = async (req: Request<{}, {}, {}, GetChallengesQuery>, res: Response, next: NextFunction) => {
    const { status, mediaType, order = 'latestFirst', keyword = '', page = '1', pageSize = '10' } = req.query;
    const statusEnum = status ? (status as Status) : undefined;
    const mediaTypeEnum = mediaType ? (mediaType as MediaType) : undefined;
    const orderEnum = order as Order;
    const options = {
      status: statusEnum,
      mediaType: mediaTypeEnum,
      order: orderEnum,
      page: Number(page),
      pageSize: Number(pageSize),
      keyword,
    };
    const { list, totalCount } = await this.challengeService.getChallenges(options);
    res.json({ list, totalCount });
  };

  getChallengeById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const challenge = await this.challengeService.getChallengeById(id);
    res.json(challenge);
  };

  postChallenge = async (req: Request<{}, {}, CreateChallengeDTO>, res: Response) => {
    const storage = getStorage();
    const userId = storage.userId;
    const challengeData = req.body;
    const newChallenge = await this.challengeService.createChallenge(challengeData, userId);
    res.json(newChallenge);
  };

  patchChallenge = async (req: Request<{ id: string }, {}, UpdateChallengeDTO>, res: Response) => {
    const { id } = req.params;
    const updateChallenge = await this.challengeService.updateChallenge(id, req.body);
    res.json(updateChallenge);
  };

  patchChallengeStatus = async (req: Request<{ id: string }, {}, UpdateChallengeStatusDTO>, res: Response) => {
    const storage = getStorage();
    const userId = storage.userId;
    const userRole = storage.userRole;
    const { id: challengeId } = req.params;
    const { status, abortReason } = req.body;
    const updatedChallenge = await this.challengeService.updateStatus({
      challengeId,
      status,
      abortReason,
      userId,
      userRole,
    });
    res.json(updatedChallenge);
  };

  getChallengeAbortReason = async (req: Request, res: Response) => {
    const { id } = req.params;
    const abortReason = await this.challengeService.getAbortReason(id);
    res.json(abortReason);
  };
}
