import jwt from 'jsonwebtoken';
import { Socket } from 'socket.io';
import { jwtSecret } from '#configs/auth.config.js';
import MESSAGES from '#utils/constants/messages.js';

export const userSocketMap = new Map<string, string>();

export const matchUserIdSocketId = async (socket: Socket) => {
  const token = socket.handshake.auth.token;

  if (!token) {
    socket.disconnect();
    throw new Error(MESSAGES.INVALID_ACCESS_TOKEN);
  }

  const decoded = jwt.verify(token, jwtSecret) as { userId: string };
  const userId = decoded.userId;

  userSocketMap.set(userId, socket.id);

  socket.on('disconnect', () => {
    userSocketMap.delete(userId);
  });
};
