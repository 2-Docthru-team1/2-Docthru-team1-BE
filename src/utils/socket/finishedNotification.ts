import { Server, Socket } from 'socket.io';
import { notificationService } from '#containers/notification.container.js';

export const finishedNotification = async (io: Server, socket: Socket, userId: string) => {
  const unreadNotifications = await notificationService.getUnreadNotifications(userId);
  if (!unreadNotifications) {
    return;
  }

  for (const notification of unreadNotifications) {
    socket.emit('storedNotifications', {
      message: notification.message,
      challengeId: notification.challengeId,
      createdAt: notification.createdAt,
    });

    await notificationService.updateNotificationAsRead(notification.id);
  }
};
