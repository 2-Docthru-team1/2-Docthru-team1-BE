import { Router } from 'express';
import feedbackController from '#containers/feedback.container.js';
import tokenVerifier from '#containers/verify.container.js';

export const feedbackRouter = Router();

feedbackRouter
  .route('/:id')
  .get(feedbackController.getFeedbackById)
  .patch(tokenVerifier.verifyAccessToken, feedbackController.patchFeedback)
  .delete(tokenVerifier.verifyAccessToken, feedbackController.deleteFeedback);

export default feedbackRouter;
