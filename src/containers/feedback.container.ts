import prismaClient from '#connection/postgres.connection.js';
import { FeedbackController } from '#controllers/feedback.controller.js';
import { FeedbackRepository } from '#repositories/feedback.repository.js';
import { NotificationRepository } from '#repositories/notification.repository.js';
import { WorkRepository } from '#repositories/work.repository.js';
import { FeedbackService } from '#services/feedback.service.js';

const feedbackRepository = new FeedbackRepository(prismaClient);
const workRepository = new WorkRepository(prismaClient);
const notificationRepository = new NotificationRepository(prismaClient);
const feedbackService = new FeedbackService(feedbackRepository, workRepository, notificationRepository);
const feedbackController = new FeedbackController(feedbackService);

export default feedbackController;
