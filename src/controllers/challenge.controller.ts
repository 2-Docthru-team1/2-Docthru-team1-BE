import type { NextFunction, Request, Response } from 'express';
import type { ChallengeService } from '#services/challenge.service.js';

export class ChallengeController {
  constructor(private challengeService: ChallengeService) {} // 이 부분에서 service에 연결합니다.

  // getChallenges = async (
  //   req: Request<{}, {}, {}, { orderBy: string; page: string; pageSize: string }>,
  //   res: Response,
  //   next: NextFunction,
  // ) => {
  //   const { orderBy, page, pageSize } = req.query;

  //   const options: { orderBy: string; page: number; pageSize: number } = {
  //     orderBy,
  //     page: Number(page),
  //     pageSize: Number(pageSize),
  //   };
  //   const challenge = await this.challengeService.getChallenges(options);

  //   res.json(challenge);
  // };

  getChallengeById = async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;
    const product = await this.challengeService.getChallengeById(id);
    res.json(product);
  };

  // postChallenge = async (req: Request, res: Response, next: NextFunction) => {
  //   assert(req.body, CreateChallenge, MESSAGES.WRONG_FORMAT);

  //   const user = await this.challengeService.createChallenge(req.body);

  //   res.json(user);
  // };

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
