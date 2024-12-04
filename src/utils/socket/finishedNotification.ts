import { Server, Socket } from 'socket.io';
import { notificationService } from '#containers/notification.container.js';

export const finishedNotification = async (io: Server, socket: Socket, userId: string) => {
  try {
    const unreadNotifications = await notificationService.getUnreadNotifications(userId);

    for (const notification of unreadNotifications) {
      socket.emit('challengeStatusChangedFinished', {
        message: notification.message,
        challengeId: notification.challengeId,
        createdAt: notification.createdAt,
      });

      await notificationService.updateNotificationAsRead(notification.id);
    }
  } catch (error) {
    console.error('Failed to send unread notifications:', error);
  }
};
