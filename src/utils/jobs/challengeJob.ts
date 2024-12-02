import jwt from 'jsonwebtoken';
import cron from 'node-cron';
import { Server } from 'socket.io';
import { jwtSecret } from '#configs/auth.config.js';
import prismaClient from '#connection/postgres.connection.js';

export const scheduleChallengeStatus = (io: Server) => {
  const userSocketMap = new Map();

  io.on('connection', async socket => {
    const token = socket.handshake.auth.token;
    const secretKey = jwtSecret;

    try {
      const decoded = jwt.verify(token, secretKey) as { userId: string };
      userSocketMap.set(decoded.userId, socket.id);

      const notifications = await prismaClient.notification.findMany({
        where: {
          userId: decoded.userId,
          isRead: false,
        },
      });

      notifications.forEach(async notification => {
        socket.emit('challengeStatusChangedFinished', {
          message: notification.message,
          challengeId: notification.challengeId,
          createdAt: notification.createdAt,
        });

        await prismaClient.notification.update({
          where: { id: notification.id },
          data: { isRead: true },
        });
      });

      socket.on('disconnect', () => {
        userSocketMap.delete(decoded.userId);
      });
    } catch (e) {
      socket.disconnect();
    }
  });

  cron.schedule('* * * * *', async () => {
    const now = new Date();

    const challengesToFinish = await prismaClient.challenge.findMany({
      where: {
        deadline: { lte: now },
        status: { in: ['pending', 'onGoing'] },
      },
      include: {
        participants: {
          select: { id: true },
        },
      },
    });

    if (challengesToFinish.length === 0) {
      return;
    }

    const challengeIds = challengesToFinish.map(challenge => challenge.id);
    await prismaClient.challenge.updateMany({
      where: { id: { in: challengeIds } },
      data: { status: 'finished' },
    });

    challengesToFinish.forEach(challenge => {
      const roomName = `challenge-${challenge.id}`;
      const participantIds = challenge.participants.map(participant => participant.id);

      participantIds.forEach(async participantId => {
        const participantSocketId = userSocketMap.get(participantId);
        const participantSocket = io.sockets.sockets.get(participantSocketId);

        if (participantSocket) {
          participantSocket.join(roomName);
          io.to(roomName).emit('challengeStatusChangedFinished', {
            message: `챌린지 "${challenge.title}" 는 종료되었습니다.`,
            challengeId: challenge.id,
            createdAt: new Date(),
          });
        } else {
          await prismaClient.notification.create({
            data: {
              userId: participantId,
              challengeId: challenge.id,
              message: `챌린지 "${challenge.title}" 는 종료되었습니다.`,
              isRead: false,
              createdAt: new Date(),
            },
          });
        }
      });
    });
  });
};
