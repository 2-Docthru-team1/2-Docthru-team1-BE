import type { MediaType, Status } from '@prisma/client';
import type { NextFunction, Request, Response } from 'express';
import type { ChallengeService } from '#services/challenge.service.js';
import type { CreateChallengeDTO, GetChallengesQuery } from '#types/challenge.types.js';
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

  postChallenge = async (req: Request, res: Response) => {
    const challengeData: CreateChallengeDTO = req.body;
    const userId = '029dc2ea-93d1-4c8d-844e-07fd9c87d23e'; // 인증 관련 기능이 완료되면 req.user.userId로 바꿀거예요!
    const newChallenge = await this.challengeService.createChallenge(challengeData, userId);
    res.json(newChallenge);
  };

  // patchChallenge = async (req: Request, res: Response, next: NextFunction) => {
  //   const { id } = req.params;
  //   assert(req.body, PatchChallenge, MESSAGES.WRONG_FORMAT);

  //   const user = await this.challengeService.updateChallenge(id, req.body);

  //   res.json(user);
  // };

  //   deleteChallenge = async (req: Request, res: Response, next: NextFunction) => {
  //     const { id } = req.params;

  //     const user = await this.challengeService.deleteChallenge(id);

  //     res.json(user);
  //   };
}
