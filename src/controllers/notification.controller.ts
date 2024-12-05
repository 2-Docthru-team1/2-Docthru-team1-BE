import type { Request, Response } from 'express';
import type { NotificationService } from '#services/notification.service.js';

export class NotificationController {
  constructor(private notificationService: NotificationService) {}

  getNotifications = async (req: Request, res: Response) => {
    const notifications = await this.notificationService.getNotifications();
    res.json(notifications);
  };
}
