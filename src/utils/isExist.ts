import type { ModelBase } from '#types/common.types.js';

export default function isExist<T extends ModelBase>(target: T | null): target is T {
  return target !== null && !target.deletedAt;
}
