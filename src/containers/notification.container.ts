import prismaClient from '#connection/postgres.connection.js';
import { NotificationRepository } from '#repositories/notification.repository.js';
import { NotificationService } from '#services/notification.service.js';

const notificationRepository = new NotificationRepository(prismaClient);
const notificationService = new NotificationService(notificationRepository);

export { notificationService };
