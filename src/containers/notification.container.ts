import prismaClient from '#connection/postgres.connection.js';
import { NotificationController } from '#controllers/notification.controller.js';
import { NotificationRepository } from '#repositories/notification.repository.js';
import { NotificationService } from '#services/notification.service.js';

const notificationRepository = new NotificationRepository(prismaClient);
const notificationService = new NotificationService(notificationRepository);
const notificationController = new NotificationController(notificationService);

export { notificationService };
export default notificationController;
