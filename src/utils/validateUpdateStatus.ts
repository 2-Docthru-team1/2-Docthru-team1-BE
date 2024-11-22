import type { ValidateUpdateStatusInput } from '#types/challenge.types.js';
import { NotFound } from '#types/http-error.types.js';
import MESSAGES from '#utils/constants/messages.js';

export const validateUpdateStatus = ({ challenge, status, abortReason, userId, userRole }: ValidateUpdateStatusInput) => {
  if (!challenge || challenge.deletedAt) {
    throw new NotFound(MESSAGES.NOT_FOUND);
  }
  // 에러는 추후 처리할 예정입니다!
  switch (status) {
    case 'onGoing':
      if (userRole !== 'admin') {
        throw new Error();
      }
      break;
    case 'denied':
    case 'aborted':
      if (userRole !== 'admin') {
        throw new Error();
      }
      if (!abortReason) {
        throw new Error();
      }
      break;
    case 'canceled':
      if (userRole !== 'normal') {
        throw new Error();
      }
      if (challenge.requestUserId !== userId) {
        throw new Error();
      }
      break;
    default:
      throw new Error();
  }
};
