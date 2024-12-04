import type { ExtendedPrismaClient } from '#types/common.types.js';

export class NotificationRepository {
  private notification: ExtendedPrismaClient['notification'];

  constructor(client: ExtendedPrismaClient) {
    this.notification = client.notification;
  }

  findUnreadNotifications = async (userId: string) => {
    return await this.notification.findMany({
      where: { userId, isRead: false },
    });
  };

  updateNotificationAsRead = async (notificationId: string) => {
    return await this.notification.update({
      where: { id: notificationId },
      data: { isRead: true },
    });
  };

  createNotification = async (userId: string, challengeId: string, message: string) => {
    return await this.notification.create({
      data: {
        userId,
        challengeId,
        message,
        isRead: false,
        createdAt: new Date(),
      },
    });
  };
}
