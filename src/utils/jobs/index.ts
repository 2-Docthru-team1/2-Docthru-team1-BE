import { scheduleChallengeStatus } from '#utils/jobs/challengeJob.js';

export const startJob = () => {
  scheduleChallengeStatus();
};
