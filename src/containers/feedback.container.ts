import baseClient from '#connection/postgres.connection.js';
import { FeedbackController } from '#controllers/feedback.controller.js';
import { FeedbackRepository } from '#repositories/feedback.repository.js';
import { FeedbackService } from '#services/feedback.service.js';

const feedbackRepository = new FeedbackRepository(baseClient.feedback);
const feedbackService = new FeedbackService(feedbackRepository);
const feedbackController = new FeedbackController(feedbackService);

export default feedbackController;
