import { Router } from 'express';
import feedbackController from '#containers/feedback.container.js';
import tokenVerifier from '#containers/verify.container.js';

export const feedbackRouter = Router();

feedbackRouter
  .route('/')
  .get(tokenVerifier.optionalVerifyAccessToken, feedbackController.getFeedbacks)
  .post(feedbackController.postFeedback);

feedbackRouter
  .route('/:id')
  .get(feedbackController.getFeedbackById)
  .patch(feedbackController.patchFeedback)
  .delete(feedbackController.deleteFeedback);

export default feedbackRouter;
