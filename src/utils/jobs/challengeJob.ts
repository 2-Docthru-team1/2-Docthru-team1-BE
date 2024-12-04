import cron from 'node-cron';
import { Server } from 'socket.io';
import { challengeService } from '#containers/challenge.container.js';
import { notificationService } from '#containers/notification.container.js';

export const scheduleChallengeStatus = (io: Server, userSocketMap: Map<string, string>) => {
  cron.schedule('* * * * *', async () => {
    const challengesToFinish = await challengeService.getChallengesToFinish();

    if (!challengesToFinish) {
      return;
    }

    const challengeIds = challengesToFinish.map(challenge => challenge.id);
    await challengeService.updateChallengesToFinished(challengeIds);

    for (const challenge of challengesToFinish) {
      const roomName = `challenge-${challenge.id}`;
      const participantIds = challenge.participants.map(participant => participant.id);

      for (const participantId of participantIds) {
        const participantSocketId = userSocketMap.get(participantId);
        if (!participantSocketId) {
          return;
        }
        const participantSocket = io.sockets.sockets.get(participantSocketId);

        if (participantSocket) {
          participantSocket.join(roomName);
          io.to(roomName).emit('challengeStatusChangedFinished', {
            message: `챌린지 "${challenge.title}" 는 종료되었습니다.`,
            challengeId: challenge.id,
            createdAt: new Date(),
          });
        } else {
          await notificationService.createNotification(
            participantId,
            challenge.id,
            `챌린지 "${challenge.title}" 는 종료되었습니다.`,
          );
        }
      }
    }
  });
};
