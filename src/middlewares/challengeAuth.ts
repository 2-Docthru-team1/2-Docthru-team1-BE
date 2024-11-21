import type { NextFunction, Request, Response } from 'express';
import { getStorage } from '#middlewares/asyncLocalStorage.js';
import { ChallengeRepository } from '#repositories/challenge.repository.js';

export class ChallengeAuth {
  constructor(private challengeRepository: ChallengeRepository) {}

  patchChallengeAuth = async (req: Request, res: Response, next: NextFunction) => {
    const { id: challengeId } = req.params;
    const challenge = await this.challengeRepository.findById(challengeId);
    if (!challenge) {
      throw new Error();
    }
    const storage = getStorage();
    const userId = storage.userId;
    if (challenge.requestUserId !== userId) {
      throw new Error();
    }
    next();
  };
}
