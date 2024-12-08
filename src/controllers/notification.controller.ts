import type { Response } from 'express';
import { assert } from 'superstruct';
import type { NotificationService } from '#services/notification.service.js';
import type { Request } from '#types/common.types.js';
import type { UpdateNotificationDTO } from '#types/notification.types.js';
import MESSAGES from '#utils/constants/messages.js';
import { PatchNotification } from '#utils/struct.js';
import { Uuid } from '#utils/struct.js';

export class NotificationController {
  constructor(private notificationService: NotificationService) {}

  getNotifications = async (req: Request, res: Response) => {
    const notifications = await this.notificationService.getNotifications();
    res.json(notifications);
  };

  patchNotification = async (req: Request<{ params: { id: string }; body: UpdateNotificationDTO }>, res: Response) => {
    assert(req.body, PatchNotification, MESSAGES.WRONG_FORMAT);
    const { id } = req.params;
    assert(id, Uuid, MESSAGES.WRONG_ID_FORMAT);

    const updateNotification = await this.notificationService.updateNotification(id, req.body);
    res.json(updateNotification);
  };
}
