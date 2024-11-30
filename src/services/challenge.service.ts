import type { AbortReason } from '@prisma/client';
import { MonthlyType } from '@prisma/client';
import type { IChallengeService } from '#interfaces/services/challenge.service.interface.js';
import { getStorage } from '#middlewares/asyncLocalStorage.js';
import type { ChallengeRepository } from '#repositories/challenge.repository.js';
import type {
  ChallengeInput,
  ChallengeStatusInput,
  CreateChallengeDTO,
  CustomChallenge,
  GetMonthlyChallengeOption,
  UpdateChallengeDTO,
  getChallengesOptions,
} from '#types/challenge.types.js';
import { BadRequest, Forbidden, NotFound } from '#types/http-error.types.js';
import { generatePresignedDownloadUrl } from '#utils/S3/generate-presigned-download-url.js';
import { generatePresignedUploadUrl } from '#utils/S3/generate-presigned-upload-url.js';
import MESSAGES from '#utils/constants/messages.js';
import filterChallenge from '#utils/filterChallenge.js';
import { validateUpdateStatus } from '#utils/validateUpdateStatus.js';

export class ChallengeService implements IChallengeService {
  constructor(private challengeRepository: ChallengeRepository) {}

  getChallenges = async (options: getChallengesOptions): Promise<{ list: CustomChallenge[]; totalCount: number }> => {
    const storage = getStorage();
    const userRole = storage.userRole;
    const isAdmin = userRole === 'admin';
    options.admin = isAdmin;

    const challenges = (await this.challengeRepository.findMany(options)) || [];
    const updatedUrlChallenges = await Promise.all(
      challenges.map(async challenge => {
        const expiresIn = 3600;
        challenge.imageUrl = await generatePresignedDownloadUrl(challenge.imageUrl, expiresIn);
        challenge.imageUrl2 = challenge.imageUrl2 ? await generatePresignedDownloadUrl(challenge.imageUrl) : null;
        return challenge;
      }),
    );

    const list = updatedUrlChallenges.map(challenge => filterChallenge(challenge));
    const totalCount = (await this.challengeRepository.totalCount(options)) || 0;

    return { totalCount, list };
  };

  getChallengeById = async (id: string): Promise<CustomChallenge | null> => {
    const challenge = await this.challengeRepository.findById(id);
    if (!challenge || challenge.deletedAt) {
      throw new NotFound(MESSAGES.NOT_FOUND);
    }

    const CustomChallenge = filterChallenge(challenge);
    const imageUrl = await generatePresignedDownloadUrl(challenge.imageUrl);
    const imageUrl2 = challenge.imageUrl2 ? await generatePresignedDownloadUrl(challenge.imageUrl2) : null;
    return {
      ...CustomChallenge,
      imageUrl,
      imageUrl2,
    };
  };

  getNextChallenge = async (id: string): Promise<CustomChallenge | null> => {
    const totalCount = (await this.challengeRepository.totalCount({ allRecords: true })) || 0;
    const challenge = await this.challengeRepository.findById(id);
    if (!challenge || challenge.deletedAt) {
      throw new NotFound(MESSAGES.NOT_FOUND);
    }

    let nextChallenge;
    let i = 1;
    do {
      if (i > totalCount) {
        throw new NotFound(MESSAGES.NOT_FOUND);
      }
      nextChallenge = await this.challengeRepository.findByNumber(challenge.number + i);
      i += 1;
    } while (!nextChallenge || nextChallenge.deletedAt || nextChallenge.monthly);

    const CustomChallenge = filterChallenge(nextChallenge);
    return CustomChallenge;
  };

  getPreviousChallenge = async (id: string): Promise<CustomChallenge | null> => {
    const challenge = await this.challengeRepository.findById(id);
    if (!challenge || challenge.deletedAt) {
      throw new NotFound(MESSAGES.NOT_FOUND);
    }

    let previousChallenge;
    let i = 1;
    do {
      if (challenge.number - i < 1) {
        throw new NotFound(MESSAGES.NOT_FOUND);
      }
      previousChallenge = await this.challengeRepository.findByNumber(challenge.number - i);
      i += 1;
    } while (!previousChallenge || previousChallenge.deletedAt || previousChallenge.monthly);

    const CustomChallenge = filterChallenge(previousChallenge);
    return CustomChallenge;
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
      imageUrl,
      imageUrl2,
    };

    const challenge = await this.challengeRepository.create(ChallengeInput);
    const CustomChallenge = filterChallenge(challenge);
    return { challenge: { ...CustomChallenge }, uploadUrls };
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
    const CustomChallenge = filterChallenge(updatedChallenge);
    return { challenge: { ...CustomChallenge }, uploadUrls };
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

    const CustomChallenge = filterChallenge(updateChallenge);
    return CustomChallenge;
  };

  getAbortReason = async (id: string): Promise<AbortReason | null> => {
    const abortReason = await this.challengeRepository.findAbortReason(id);
    if (!abortReason) {
      throw new NotFound(MESSAGES.NOT_FOUND);
    }
    return abortReason;
  };

  getMonthlyChallenge = async (option: GetMonthlyChallengeOption): Promise<CustomChallenge[] | null> => {
    if (!Object.values(MonthlyType).includes(option.monthly)) {
      throw new Error(MESSAGES.BAD_REQUEST);
    }

    const validMonthly = option.monthly as MonthlyType;
    const currentYear = new Date().getFullYear();
    const monthlyChallenge = await this.challengeRepository.findMonthlyChallenge({ monthly: validMonthly }, currentYear);
    if (!monthlyChallenge || monthlyChallenge.length === 0) {
      throw new NotFound(MESSAGES.NOT_FOUND);
    }

    const returnDownloadUrls = monthlyChallenge.map(async ({ isHidden, requestUserId, imageUrl, imageUrl2, ...rest }) => {
      const expiresIn = 3600;
      const downloadImageUrl = await generatePresignedDownloadUrl(imageUrl, expiresIn);
      const downloadImageUrl2 = imageUrl2 ? await generatePresignedDownloadUrl(imageUrl2, expiresIn) : null;

      return {
        ...rest,
        imageUrl: downloadImageUrl,
        imageUrl2: downloadImageUrl2,
      };
    });

    const filteredMonthlyChallenge = await Promise.all(returnDownloadUrls);
    return filteredMonthlyChallenge;
  };
}
