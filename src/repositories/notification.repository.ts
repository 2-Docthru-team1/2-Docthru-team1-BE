import type { Notification } from '@prisma/client';
import type { INotificationRepository } from '#interfaces/repositories/notification.repository.interface.js';
import type { ExtendedPrismaClient } from '#types/common.types.js';
import type { UpdateNotificationDTO } from '#types/notification.types.js';

export class NotificationRepository implements INotificationRepository {
  private notification: ExtendedPrismaClient['notification'];

  constructor(client: ExtendedPrismaClient) {
    this.notification = client.notification;
  }

  getNotifications = async (
    userId: string,
    options: { limit: number; orderBy: string; orderDirection: 'desc' },
  ): Promise<Notification[] | null> => {
    const { limit, orderBy, orderDirection } = options;

    return await this.notification.findMany({
      where: { userId },
      orderBy: { [orderBy]: orderDirection },
      take: limit,
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

  updateNotificationIsRead = async (id: string, data: UpdateNotificationDTO): Promise<Notification> => {
    const notification = await this.notification.update({
      where: { id },
      data,
    });

    return notification;
  };

  findNotificationById = async (id: string) => {
    const notification = await this.notification.findUnique({
      where: { id },
    });

    return notification;
  };
}
