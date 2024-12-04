import { Server } from 'socket.io';
import { finishedNotification } from './finishedNotification.js';
import { matchUserIdSocketId } from './socket.utils.js';

export const startSocket = (io: Server) => {
  io.on('connection', async socket => {
    const userId = await matchUserIdSocketId(socket);
    await finishedNotification(io, socket, userId);
  });
};
