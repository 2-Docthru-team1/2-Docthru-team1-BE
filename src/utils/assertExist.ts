import type { ModelBase } from '#types/common.types.js';
import { NotFound } from '#types/http-error.types.js';
import MESSAGES from '#utils/constants/messages.js';

export default function assertExist<T extends ModelBase>(target: T | null): asserts target is T {
  if (target === null) {
    throw new NotFound(MESSAGES.NOT_FOUND);
  } else if (target.deletedAt) {
    throw new NotFound(MESSAGES.DELETED_RESOURCE);
  }
}
