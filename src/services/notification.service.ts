import type { Notification } from '@prisma/client';
import type { INotificationService } from '#interfaces/services/notification.service.interface.js';
import { getStorage } from '#middlewares/asyncLocalStorage.js';
import type { NotificationRepository } from '#repositories/notification.repository.js';
import { NotFound } from '#types/http-error.types.js';
import MESSAGES from '#utils/constants/messages.js';

export class NotificationService implements INotificationService {
  constructor(private notificationRepository: NotificationRepository) {}

  getNotifications = async (): Promise<Notification[] | null> => {
    const storage = getStorage();
    const userId = storage.userId;
    const notifications = await this.notificationRepository.getNotifications(userId, {
      limit: 15,
      orderBy: 'createdAt',
      orderDirection: 'desc',
    });
    if (!notifications || notifications.length === 0) {
      throw new NotFound(MESSAGES.NOT_FOUND);
    }
    return notifications;
  };

  createNotification = async (userId: string, message: string, challengeId: string): Promise<Notification> => {
    return await this.notificationRepository.createNotification(userId, message, challengeId);
  };
}
