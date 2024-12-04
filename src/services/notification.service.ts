import { getStorage } from '#middlewares/asyncLocalStorage.js';
import type { NotificationRepository } from '#repositories/notification.repository.js';
import { NotFound } from '#types/http-error.types.js';
import MESSAGES from '#utils/constants/messages.js';

export class NotificationService {
  constructor(private notificationRepository: NotificationRepository) {}

  getNotifications = async () => {
    const storage = getStorage();
    const userId = storage.userId;
    const notifications = await this.notificationRepository.getNotifications(userId);
    if (!notifications || notifications.length === 0) {
      throw new NotFound(MESSAGES.NOT_FOUND);
    }
    return notifications;
  };

  createNotification = async (userId: string, message: string, challengeId: string) => {
    return await this.notificationRepository.createNotification(userId, message, challengeId);
  };
}
