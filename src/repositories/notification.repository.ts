import type { Notification } from '@prisma/client';
import type { INotificationRepository } from '#interfaces/repositories/notification.repository.interface.js';
import type { ExtendedPrismaClient } from '#types/common.types.js';

export class NotificationRepository implements INotificationRepository {
  private notification: ExtendedPrismaClient['notification'];

  constructor(client: ExtendedPrismaClient) {
    this.notification = client.notification;
  }

  getNotifications = async (userId: string): Promise<Notification[] | null> => {
    return await this.notification.findMany({
      where: { userId },
    });
  };

  createNotification = async (userId: string, challengeId: string, message: string): Promise<Notification> => {
    return await this.notification.create({
      data: {
        userId,
        challengeId,
        message,
        createdAt: new Date(),
        isRead: false,
      },
    });
  };
}
