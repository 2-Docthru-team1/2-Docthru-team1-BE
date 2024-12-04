import type { Notification } from '@prisma/client';

export interface INotificationRepository {
  getNotifications(userId: string): Promise<Notification[] | null>;
  createNotification(userId: string, challengeId: string, message: string): Promise<Notification>;
}
