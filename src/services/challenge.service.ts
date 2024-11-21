import type { AbortReason, Challenge } from '@prisma/client';
import type { IChallengeService } from '#interfaces/services/challenge.service.interface.js';
import type { ChallengeRepository } from '#repositories/challenge.repository.js';
import type {
  ChallengeInput,
  ChallengeStatusInput,
  CreateChallengeDTO,
  UpdateChallengeDTO,
  getChallengesOptions,
} from '#types/challenge.types.js';
import { validateUpdateStatus } from '#utils/validateUpdateStatus.js';

export class ChallengeService implements IChallengeService {
  constructor(private challengeRepository: ChallengeRepository) {}

  // 이 아래로 데이터를 가공하는 코드를 작성합니다.
  // 비즈니스 로직, DB에서 가져온 데이터를 가공하는 코드가 주로 작성됩니다.
  // 여기서 가공된 데이터를 controller로 올려줍니다.

  getChallenges = async (options: getChallengesOptions): Promise<{ list: Challenge[]; totalCount: number }> => {
    const list = (await this.challengeRepository.findMany(options)) || [];
    const totalCount = (await this.challengeRepository.totalCount(options)) || 0;
    return { list, totalCount };
  };

  getChallengeById = async (id: string): Promise<Challenge | null> => {
    return await this.challengeRepository.findById(id);
  };

  createChallenge = async (challengeData: CreateChallengeDTO, userId: string): Promise<Challenge> => {
    const ChallengeInput: ChallengeInput = {
      ...challengeData,
      status: 'pending',
      isHidden: false,
      requestUserId: userId,
      participants: [{ id: userId }],
    };
    return await this.challengeRepository.create(ChallengeInput);
  };

  updateChallenge = async (id: string, challengeData: UpdateChallengeDTO): Promise<Challenge> => {
    const challenge = await this.challengeRepository.update(id, challengeData);
    return challenge;
  };

  updateStatus = async (data: ChallengeStatusInput): Promise<Challenge | null> => {
    const { challengeId, status, abortReason, userId, userRole } = data;
    const challenge = await this.challengeRepository.findById(challengeId);

    validateUpdateStatus({
      challenge,
      status,
      abortReason,
      userId,
      userRole,
    });

    return await this.challengeRepository.updateStatus({
      challengeId,
      status,
      abortReason,
      userId,
    });
  };

  getAbortReason = async (id: string): Promise<AbortReason | null> => {
    const abortReason = await this.challengeRepository.findAbortReason(id);
    return abortReason;
  };
}
