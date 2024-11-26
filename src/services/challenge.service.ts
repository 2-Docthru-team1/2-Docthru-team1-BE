import type { AbortReason, Challenge } from '@prisma/client';
import type { IChallengeService } from '#interfaces/services/challenge.service.interface.js';
import { getStorage } from '#middlewares/asyncLocalStorage.js';
import type { ChallengeRepository } from '#repositories/challenge.repository.js';
import type {
  ChallengeInput,
  ChallengeStatusInput,
  CreateChallengeDTO,
  CustomChallenge,
  UpdateChallengeDTO,
  getChallengesOptions,
} from '#types/challenge.types.js';
import { BadRequest, Forbidden, NotFound } from '#types/http-error.types.js';
import { generatePresignedDownloadUrl } from '#utils/S3/generate-presigned-download-url.js';
import { generatePresignedUploadUrl } from '#utils/S3/generate-presigned-upload-url.js';
import MESSAGES from '#utils/constants/messages.js';
import { validateUpdateStatus } from '#utils/validateUpdateStatus.js';

export class ChallengeService implements IChallengeService {
  constructor(private challengeRepository: ChallengeRepository) {}

  // 이 아래로 데이터를 가공하는 코드를 작성합니다.
  // 비즈니스 로직, DB에서 가져온 데이터를 가공하는 코드가 주로 작성됩니다.
  // 여기서 가공된 데이터를 controller로 올려줍니다.

  getChallenges = async (
    options: getChallengesOptions,
  ): Promise<{ list: Omit<Challenge, 'isHidden' | 'requestUserId'>[]; totalCount: number }> => {
    const storage = getStorage();
    const userRole = storage.userRole;
    const isAdmin = userRole === 'admin';
    const verifyAdminOptions: getChallengesOptions & { admin: boolean } = { ...options, admin: isAdmin };
    const list = (await this.challengeRepository.findMany(verifyAdminOptions)) || [];
    const totalCount = (await this.challengeRepository.totalCount(verifyAdminOptions)) || 0;
    const listWithoutIsHidden = list.map(challenge => {
      const { isHidden, requestUserId, ...otherField } = challenge;
      return { ...otherField };
    });
    return { list: listWithoutIsHidden, totalCount };
  };

  getChallengeById = async (id: string): Promise<CustomChallenge | null> => {
    const expiresIn = 3600;
    const challenge = await this.challengeRepository.findById(id);
    if (!challenge || challenge.deletedAt) {
      throw new NotFound(MESSAGES.NOT_FOUND);
    }
    const { isHidden, requestUserId, ...rest } = challenge;
    const imageUrl = await generatePresignedDownloadUrl(challenge.imageUrl, expiresIn);
    const imageUrl2 = challenge.imageUrl2 ? await generatePresignedDownloadUrl(challenge.imageUrl2, expiresIn) : null;
    return {
      ...rest,
      imageUrl,
      imageUrl2,
    };
  };

  createChallenge = async (
    challengeData: CreateChallengeDTO,
  ): Promise<{ challenge: CustomChallenge; uploadUrls: { uploadUrl: string }[] }> => {
    const storage = getStorage();
    const userId = storage.userId;
    if (!userId) {
      throw new BadRequest(MESSAGES.UNAUTHORIZED);
    }
    const { imageCount, ...restChallengeData } = challengeData;
    const uploadUrls: { uploadUrl: string }[] = [];
    let imageUrl: string = '';
    let imageUrl2: string | undefined = undefined;

    for (let i = 0; i < imageCount; i++) {
      const uniqueFileName = `${userId}/${Date.now()}-image-${i}.jpg`;
      const s3Key = `${uniqueFileName}`;
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
      participants: [],
      imageUrl,
      imageUrl2,
    };

    const challenge = await this.challengeRepository.create(ChallengeInput);
    const { isHidden, requestUserId, ...rest } = challenge;
    return { challenge: { ...rest }, uploadUrls };
  };

  updateChallenge = async (
    id: string,
    challengeData: UpdateChallengeDTO,
  ): Promise<{ challenge: CustomChallenge; uploadUrls: { uploadUrl: string }[] }> => {
    const { imageCount, ...restChallengeData } = challengeData;
    const storage = getStorage();
    const userId = storage.userId;
    const challenge = await this.challengeRepository.findById(id);

    if (!userId) {
      throw new BadRequest(MESSAGES.UNAUTHORIZED);
    }
    if (!challenge || challenge.deletedAt) {
      throw new NotFound(MESSAGES.NOT_FOUND);
    }
    if (challenge.requestUserId !== userId) {
      throw new Forbidden(MESSAGES.FORBIDDEN);
    }

    const uploadUrls: { uploadUrl: string }[] = [];
    let imageUrl: string = '';
    let imageUrl2: string | undefined = undefined;

    if (imageCount !== undefined && imageCount > 0) {
      for (let i = 0; i < imageCount; i++) {
        const uniqueFileName = `${userId}/${Date.now()}-image-${i}.jpg`;
        const s3Key = `${uniqueFileName}`;
        const contentType = 'image/jpeg';
        const expiresIn = 3600;
        const uploadUrl = await generatePresignedUploadUrl(s3Key, contentType, expiresIn);
        uploadUrls.push({ uploadUrl });
        if (i === 0) imageUrl = s3Key;
        if (i === 1) imageUrl2 = s3Key;
      }
      if (imageCount === 1) {
        imageUrl2 = undefined;
      }
    }

    const updatedChallengeInput: UpdateChallengeDTO = {
      ...restChallengeData,
      imageUrl,
      imageUrl2,
    };

    const updatedChallenge = await this.challengeRepository.update(id, updatedChallengeInput);
    const { isHidden, requestUserId, ...rest } = updatedChallenge;
    return { challenge: { ...rest }, uploadUrls };
  };

  updateStatus = async (data: ChallengeStatusInput): Promise<CustomChallenge | null> => {
    const storage = getStorage();
    const userId = storage.userId;
    const userRole = storage.userRole;
    const { challengeId, status, abortReason } = data;
    const challenge = await this.challengeRepository.findById(challengeId);

    validateUpdateStatus({
      challenge,
      status,
      abortReason,
      userId,
      userRole,
    });

    const updateChallenge = await this.challengeRepository.updateStatus({
      challengeId,
      status,
      abortReason,
      userId,
    });

    const { isHidden, requestUserId, ...rest } = updateChallenge;
    return { ...rest };
  };

  getAbortReason = async (id: string): Promise<AbortReason | null> => {
    const abortReason = await this.challengeRepository.findAbortReason(id);
    if (!abortReason) {
      throw new NotFound(MESSAGES.NOT_FOUND);
    }
    return abortReason;
  };
}
