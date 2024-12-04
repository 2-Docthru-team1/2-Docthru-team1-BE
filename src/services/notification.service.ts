import type { NotificationRepository } from '#repositories/notification.repository.js';

export class NotificationService {
  constructor(private notificationRepository: NotificationRepository) {}

  getUnreadNotifications = async (userId: string) => {
    return await this.notificationRepository.findUnreadNotifications(userId);
  };

  updateNotificationAsReadd = async (notificationId: string) => {
    return await this.notificationRepository.updateNotificationAsRead(notificationId);
  };

  createNotification = async (userId: string, message: string, challengeId: string) => {
    return await this.notificationRepository.createNotification(userId, message, challengeId);
  };
}
