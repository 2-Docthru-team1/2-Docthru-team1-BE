import type { Challenge } from '@prisma/client';

export default function filterChallenge(challenge: Challenge): Omit<Challenge, 'isHidden' | 'requestUserId'> {
  const { isHidden, requestUserId, ...rest } = challenge;
  return rest;
}
