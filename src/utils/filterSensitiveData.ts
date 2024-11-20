import type { SafeUser, User } from '#types/user.types.js';

export default function filterSensitiveData(data: User): SafeUser {
  const { password, salt, refreshToken, ...rest } = data;

  return rest;
}
