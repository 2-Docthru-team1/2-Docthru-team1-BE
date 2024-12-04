import type { ExtendedPrismaClient } from '#types/common.types.js';

export class NotificationRepository {
  private notification: ExtendedPrismaClient['notification'];

  constructor(client: ExtendedPrismaClient) {
    this.notification = client.notification;
  }

  getNotifications = async (userId: string) => {
    return await this.notification.findMany({
      where: { userId },
    });
  };

  createNotification = async (userId: string, challengeId: string, message: string) => {
    return await this.notification.create({
      data: {
        userId,
        challengeId,
        message,
        createdAt: new Date(),
      },
    });
  };
}
