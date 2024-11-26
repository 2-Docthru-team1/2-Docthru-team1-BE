import type { ValidateUpdateStatusInput } from '#types/challenge.types.js';
import { BadRequest, Forbidden, NotFound } from '#types/http-error.types.js';
import MESSAGES from '#utils/constants/messages.js';

export const validateUpdateStatus = ({ challenge, status, abortReason, userId, userRole }: ValidateUpdateStatusInput) => {
  if (!challenge || challenge.deletedAt) {
    throw new NotFound(MESSAGES.NOT_FOUND);
  }
  // 에러는 추후 처리할 예정입니다!
  switch (status) {
    case 'onGoing':
      if (userRole !== 'admin') {
        throw new Forbidden(MESSAGES.FORBIDDEN);
      }
      break;
    case 'denied':
    case 'aborted':
      if (userRole !== 'admin') {
        throw new Forbidden(MESSAGES.FORBIDDEN);
      }
      if (!abortReason) {
        throw new BadRequest(MESSAGES.MISSING_FIELDS);
      }
      break;
    case 'canceled':
      if (challenge.requestUserId !== userId) {
        throw new Forbidden(MESSAGES.FORBIDDEN);
      }
      break;
    default:
      throw new BadRequest(MESSAGES.BAD_REQUEST);
  }
};
