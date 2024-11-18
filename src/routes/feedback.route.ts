import { Router } from 'express';
import feedbackController from '#containers/feedback.container.js';

export const feedbackRouter = Router();

feedbackRouter.route('/').get(feedbackController.getFeedbacks);

feedbackRouter.route('/:id').get(feedbackController.getFeedbackById);

export default feedbackRouter;
