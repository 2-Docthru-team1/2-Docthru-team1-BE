import type { Notification } from '@prisma/client';

export interface INotificationService {
  getNotifications(): Promise<Notification[] | null>;
  createNotification(userId: string, challengeId: string, message: string): Promise<Notification>;
}
