import jwt from 'jsonwebtoken';
import { Server } from 'socket.io';
import { jwtSecret } from '#configs/auth.config.js';
import { finishedNotification } from './finishedNotification.js';

export const startSocket = (io: Server) => {
  const userSocketMap = new Map<string, string>();

  io.on('connection', async socket => {
    const token = socket.handshake.auth.token;

    try {
      const decoded = jwt.verify(token, jwtSecret) as { userId: string };
      const userId = decoded.userId;

      userSocketMap.set(userId, socket.id);

      await finishedNotification(io, socket, userId, userSocketMap);

      socket.on('disconnect', () => {
        userSocketMap.delete(userId);
      });
    } catch (error) {
      socket.disconnect();
    }
  });
};
