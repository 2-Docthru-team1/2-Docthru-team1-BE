import express from 'express';
import feedbackController from '#containers/feedback.container.js';
import tokenVerifier from '#containers/verify.container.js';
import workController from '#containers/work.container.js';

export const workRouter = express.Router();

workRouter
  .route('/:id')
  .get(workController.getWorkById)
  .patch(tokenVerifier.verifyAccessToken, workController.patchWork)
  .delete(tokenVerifier.verifyAccessToken, workController.deleteWork);

workRouter.route('/:id/like').post().delete();

workRouter
  .route('/:id/feedbacks')
  .get(feedbackController.getFeedbacks)
  .post(tokenVerifier.verifyAccessToken, feedbackController.postFeedback);

export default workRouter;
