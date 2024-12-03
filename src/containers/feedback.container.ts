import prismaClient from '#connection/postgres.connection.js';
import { FeedbackController } from '#controllers/feedback.controller.js';
import { FeedbackRepository } from '#repositories/feedback.repository.js';
import { WorkRepository } from '#repositories/work.repository.js';
import { FeedbackService } from '#services/feedback.service.js';

const feedbackRepository = new FeedbackRepository(prismaClient);
const workRepository = new WorkRepository(prismaClient);
const feedbackService = new FeedbackService(feedbackRepository, workRepository);
const feedbackController = new FeedbackController(feedbackService);

export default feedbackController;
