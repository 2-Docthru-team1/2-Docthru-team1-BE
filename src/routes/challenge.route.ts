import express from 'express';
import challengeController from '#containers/challenge.container.js';
import tokenVerifier from '#containers/verify.container.js';
import workController from '#containers/work.container.js';
import validatePaginationOptions from '#middlewares/pagination.validation.js';
import { validateCreateChallenge, validateUpdateChallenge } from '#middlewares/validateChallenge.js';

export const challengeRouter = express.Router();

challengeRouter
  .route('/')
  .get(validatePaginationOptions, tokenVerifier.optionalVerifyAccessToken, challengeController.getChallenges)
  .post(tokenVerifier.verifyAccessToken, validateCreateChallenge, challengeController.postChallenge);

challengeRouter.get('/monthly', challengeController.getMonthlyChallenge);

challengeRouter
  .route('/:id')
  .get(challengeController.getChallengeById)
  .patch(tokenVerifier.verifyAccessToken, validateUpdateChallenge, challengeController.patchChallenge);

challengeRouter.patch('/:id/status', tokenVerifier.verifyAccessToken, challengeController.patchChallengeStatus);
challengeRouter.get('/:id/reason', challengeController.getChallengeAbortReason);

challengeRouter.route('/:id/works').get(workController.getWorks).post(tokenVerifier.verifyAccessToken, workController.postWork);

challengeRouter.route('/participation').get(tokenVerifier.verifyAccessToken, challengeController.getMyParticipations);
challengeRouter.route('/my-requests').get(tokenVerifier.verifyAccessToken, challengeController.getMyRequests);

export default challengeRouter;
