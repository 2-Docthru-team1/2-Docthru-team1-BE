import type { Notification } from '@prisma/client';
import type { INotificationService } from '#interfaces/services/notification.service.interface.js';
import { getStorage } from '#middlewares/asyncLocalStorage.js';
import type { NotificationRepository } from '#repositories/notification.repository.js';
import { BadRequest, Forbidden } from '#types/http-error.types.js';
import type { UpdateNotificationDTO } from '#types/notification.types.js';
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
      return [];
    }
    return notifications;
  };

  createNotification = async (userId: string, challengeId: string, message: string): Promise<Notification> => {
    return await this.notificationRepository.createNotification(userId, challengeId, message);
  };

  updateNotification = async (id: string, notificationData: UpdateNotificationDTO): Promise<Notification> => {
    const storage = getStorage();
    const userId = storage.userId;
    const notification = await this.notificationRepository.findNotificationById(id);

    if (!notification) {
      throw new Error(MESSAGES.NOT_FOUND);
    }
    if (!userId) {
      throw new BadRequest(MESSAGES.UNAUTHORIZED);
    }
    if (notification.userId !== userId) {
      throw new Forbidden(MESSAGES.FORBIDDEN);
    }

    const updatedNotification = await this.notificationRepository.updateNotificationIsRead(id, notificationData);
    return updatedNotification;
  };
}
