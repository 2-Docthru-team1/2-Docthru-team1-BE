import { Server } from 'socket.io';
import { scheduleChallengeStatus } from '#utils/jobs/challengeJob.js';

export const startJob = (io: Server) => {
  scheduleChallengeStatus(io);
};
