import express from 'express';
import challengeController from '#containers/challenge.container.js';
import tokenVerifier from '#containers/verify.container.js';
import workController from '#containers/work.container.js';
import validateIsAdmin from '#middlewares/isAdmin.validation.js';
import validatePaginationOptions from '#middlewares/pagination.validation.js';

export const challengeRouter = express.Router();

challengeRouter
  .route('/')
  .get(validatePaginationOptions, tokenVerifier.optionalVerifyAccessToken, challengeController.getChallenges)
  .post(tokenVerifier.verifyAccessToken, challengeController.postChallenge);

challengeRouter.get('/monthly', challengeController.getMonthlyChallenge);

challengeRouter
  .route('/admin-requests')
  .get(tokenVerifier.verifyAccessToken, validateIsAdmin, challengeController.getRequestChallenges);
challengeRouter.route('/participation').get(tokenVerifier.verifyAccessToken, challengeController.getMyParticipations);
challengeRouter.route('/my-requests').get(tokenVerifier.verifyAccessToken, challengeController.getMyRequests);

challengeRouter
  .route('/:id')
  .get(challengeController.getChallengeById)
  .patch(tokenVerifier.verifyAccessToken, challengeController.patchChallenge);

challengeRouter.route('/:id/next').get(challengeController.getNextChallenge);
challengeRouter.route('/:id/prev').get(challengeController.getPrevChallenge);

challengeRouter.patch('/:id/status', tokenVerifier.verifyAccessToken, challengeController.patchChallengeStatus);
challengeRouter.get('/:id/reason', challengeController.getChallengeAbortReason);

challengeRouter.route('/:id/works').get(workController.getWorks).post(tokenVerifier.verifyAccessToken, workController.postWork);

export default challengeRouter;
