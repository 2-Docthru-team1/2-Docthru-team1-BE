import cron from 'node-cron';
import prismaClient from '#connection/postgres.connection.js';

export const scheduleChallengeStatus = () => {
  cron.schedule('0 0 * * *', async () => {
    console.log('test');
    const now = new Date();
    const updateChallengeStatusFinished = await prismaClient.challenge.updateMany({
      where: {
        deadline: { lte: now },
        status: { in: ['pending', 'onGoing'] },
      },
      data: {
        status: 'finished',
      },
    });
    return updateChallengeStatusFinished;
  });
};
