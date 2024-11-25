import { scheduleChallengeStatus } from '#utils/jobs/challengeJob.js';

export const startJob = () => {
  console.log('testIndex');
  scheduleChallengeStatus();
};
