import jwt from 'jsonwebtoken';
import { Server } from 'socket.io';
import { jwtSecret } from '#configs/auth.config.js';
import MESSAGES from '#utils/constants/messages.js';
import { finishedNotification } from './finishedNotification.js';

export const startSocket = (io: Server) => {
  const userSocketMap = new Map<string, string>();

  io.on('connection', async socket => {
    const token = socket.handshake.auth.token;
    if (!token) {
      socket.disconnect();
      throw new Error(MESSAGES.INVALID_ACCESS_TOKEN);
    }

    try {
      const decoded = jwt.verify(token, jwtSecret) as { userId: string };
      const userId = decoded.userId;

      userSocketMap.set(userId, socket.id);

      await finishedNotification(io, socket, userId);

      socket.on('disconnect', () => {
        userSocketMap.delete(userId);
      });
    } catch (error) {
      socket.disconnect();
    }
  });
};
