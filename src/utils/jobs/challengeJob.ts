import cron from 'node-cron';
import { Server } from 'socket.io';
import { challengeService } from '#containers/challenge.container.js';
import { notificationService } from '#containers/notification.container.js';
import { userSocketMap } from '#utils/socket/socket.utils.js';

export const scheduleChallengeStatus = (io: Server) => {
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
        const notificationMessage = `The challenge "${challenge.title}" has been completed.`;
        const notification = await notificationService.createNotification(participantId, challenge.id, notificationMessage);
        const notificationId = notification.id;

        const participantSocketId = userSocketMap.get(participantId);
        if (participantSocketId) {
          const participantSocket = io.sockets.sockets.get(participantSocketId);

          if (participantSocket) {
            participantSocket.join(roomName);
            io.to(roomName).emit('challengeStatusChangedFinished', {
              id: notificationId,
              message: notificationMessage,
              challengeId: challenge.id,
              createdAt: new Date(),
              isRead: false,
            });
          }
        }
      }
    }
  });
};
