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
import { generatePresignedUploadUrl } from '#utils/S3/generate-presigned-upload-url.js';
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

  createChallenge = async (
    challengeData: CreateChallengeDTO,
    userId: string,
  ): Promise<{ challenge: Challenge; uploadUrls: { uploadUrl: string }[] }> => {
    const { imageCount, ...restChallengeData } = challengeData;
    const uploadUrls: { uploadUrl: string }[] = [];
    let imageUrl: string = '';
    let imageUrl2: string | undefined = undefined;

    for (let i = 0; i < imageCount; i++) {
      const uniqueFileName = `${Date.now()}-image-${i}.jpg`;
      const s3Key = `challenges/${uniqueFileName}`;
      const contentType = 'image/jpeg';
      const expiresIn = 3600;
      const uploadUrl = await generatePresignedUploadUrl(s3Key, contentType, expiresIn);
      uploadUrls.push({ uploadUrl });
      if (i === 0) imageUrl = s3Key;
      if (i === 1) imageUrl2 = s3Key;
    }

    const ChallengeInput: ChallengeInput = {
      ...restChallengeData,
      status: 'pending',
      isHidden: false,
      requestUserId: userId,
      participants: [{ id: userId }],
      imageUrl,
      imageUrl2,
    };

    const challenge = await this.challengeRepository.create(ChallengeInput);
    return { challenge, uploadUrls };
  };

  updateChallenge = async (id: string, challengeData: UpdateChallengeDTO, userId: string): Promise<Challenge> => {
    const challenge = await this.challengeRepository.update(id, challengeData);
    if (!userId) {
      throw new Error();
    }
    if (!challenge) {
      throw new Error();
    }
    if (challenge.requestUserId !== userId) {
      throw new Error();
    }

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
