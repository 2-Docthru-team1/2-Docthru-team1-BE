import type { Challenge } from '@prisma/client';
import type { IChallengeService } from '#interfaces/services/challenge.service.interface.js';
import type { ChallengeRepository } from '#repositories/challenge.repository.js';

export class ChallengeService implements IChallengeService {
  constructor(private challengeRepository: ChallengeRepository) {} // 이 부분에 Repository를 연결합니다.

  // 이 아래로 데이터를 가공하는 코드를 작성합니다.
  // 비즈니스 로직, DB에서 가져온 데이터를 가공하는 코드가 주로 작성됩니다.
  // 여기서 가공된 데이터를 controller로 올려줍니다.
  // getChallenges = async (options: { orderBy: string; page: number; pageSize: number }): Promise<Challenge[] | null> => {
  //   const challenges = await this.challengeRepository.findMany(options);

  //   return challenges;
  // };

  getChallengeById = async (id: string): Promise<Challenge | null> => {
    return await this.challengeRepository.findById(id);
  };

  // createChallenge = async (challengeData: CreateChallengeDTO): Promise<Challenge> => {
  //   const challenge = await this.challengeRepository.create(challengeData);

  //   return challenge;
  // };

  // updateChallenge = async (id: string, challengeData: UpdateChallengeDTO): Promise<Challenge> => {
  //   const challenge = await this.challengeRepository.update(id, challengeData);
  //   return challenge;
  // };

  // deleteChallenge = async (id: string): Promise<Challenge> => {
  //   const challenge = await this.challengeRepository.delete(id);

  //   return challenge;
  // };
}
