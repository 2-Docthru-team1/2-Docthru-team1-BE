import prismaClient from '#connection/postgres.connection.js';
import { FeedbackController } from '#controllers/feedback.controller.js';
import { FeedbackRepository } from '#repositories/feedback.repository.js';
import { FeedbackService } from '#services/feedback.service.js';

// 여기서 Repository, Service, Controller를 연결합니다. 그리고 컨트롤러를 export 해줍니다.
const feedbackRepository = new FeedbackRepository(prismaClient.feedback);
const feedbackService = new FeedbackService(feedbackRepository);
const feedbackController = new FeedbackController(feedbackService);

export default feedbackController;
