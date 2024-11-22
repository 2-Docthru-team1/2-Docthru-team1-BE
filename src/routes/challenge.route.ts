import express from 'express';
import challengeController from '#containers/challenge.container.js';
import tokenVerifier from '#containers/verify.container.js';
import workController from '#containers/work.container.js';
import validatePaginationOptions from '#middlewares/pagination.validation.js';
import { validateCreateChallenge, validateUpdateChallenge } from '#middlewares/validateChallenge.js';

export const challengeRouter = express.Router();
// 여기서 controller의 method를 불러줍니다.
// 메소드의 리턴값이 아니라 메소드 자체를 넘겨주어야 합니다.
// app.method로 입력하지 않도록 주의해주세요. router.method입니다.
challengeRouter
  .route('/')
  .get(validatePaginationOptions, challengeController.getChallenges)
  .post(tokenVerifier.verifyAccessToken, validateCreateChallenge, challengeController.postChallenge);

challengeRouter
  .route('/:id')
  .get(challengeController.getChallengeById)
  .patch(tokenVerifier.verifyAccessToken, validateUpdateChallenge, challengeController.patchChallenge);

challengeRouter.patch('/:id/status', tokenVerifier.verifyAccessToken, challengeController.patchChallengeStatus);
challengeRouter.get('/:id/reason', challengeController.getChallengeAbortReason);

challengeRouter.route('/:id/works').get(workController.getWorks);


export default challengeRouter;
