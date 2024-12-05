import type { Notification } from '@prisma/client';

export interface INotificationRepository {
  getNotifications(
    userId: string,
    options: { limit: number; orderBy: string; orderDirection: 'desc' },
  ): Promise<Notification[] | null>;
  createNotification(userId: string, challengeId: string, message: string): Promise<Notification>;
}
