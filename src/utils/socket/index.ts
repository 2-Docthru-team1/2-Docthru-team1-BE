import { Server } from 'socket.io';
import { matchUserIdSocketId } from './socket.utils.js';

export const startSocket = (io: Server) => {
  io.on('connection', async socket => {
    await matchUserIdSocketId(socket);
  });
};
