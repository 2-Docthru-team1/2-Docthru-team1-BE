import express from 'express';
import challengeController from '#containers/challenge.container.js';
import tokenVerifier from '#containers/verify.container.js';
import workController from '#containers/work.container.js';
import validatePaginationOptions from '#middlewares/pagination.validation.js';
import { validateCreateChallenge } from '#middlewares/validateChallenge.js';

export const challengeRouter = express.Router();

challengeRouter
  .route('/')
  .get(validatePaginationOptions, tokenVerifier.optionalVerifyAccessToken, challengeController.getChallenges)
  .post(tokenVerifier.verifyAccessToken, validateCreateChallenge, challengeController.postChallenge);

challengeRouter.route('/:id').get(challengeController.getChallengeById);

challengeRouter.patch('/:id/status', tokenVerifier.verifyAccessToken, challengeController.patchChallengeStatus);
challengeRouter.get('/:id/reason', challengeController.getChallengeAbortReason);

challengeRouter.route('/:id/works').get(workController.getWorks).post(tokenVerifier.verifyAccessToken, workController.postWork);

export default challengeRouter;
