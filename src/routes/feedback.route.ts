import { Router } from 'express';
import feedbackController from '#containers/feedback.container.js';

export const feedbackRouter = Router();

feedbackRouter.route('/').get(feedbackController.getFeedbacks).post(feedbackController.postFeedback);

feedbackRouter
  .route('/:id')
  .get(feedbackController.getFeedbackById)
  .patch(feedbackController.patchFeedback)
  .delete(feedbackController.deleteFeedback);

export default feedbackRouter;
