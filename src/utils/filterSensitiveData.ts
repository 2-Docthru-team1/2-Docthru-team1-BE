import type { User } from '#types/user.types.js';

export default function filterSensitiveData(data: User) {
  const { password, salt, refreshToken, ...rest } = data;

  return rest;
}
