import express from 'express';
import challengeController from '#containers/challenge.container.js';
import { errorCatchHandler } from '../middlewares/errorCatchHandler.js';

export const challengeRouter = express.Router();

// 여기서 controller의 method를 불러줍니다.
// 메소드의 리턴값이 아니라 메소드 자체를 넘겨주어야 합니다.
// app.method로 입력하지 않도록 주의해주세요. router.method입니다.
challengeRouter.route('/');
challengeRouter.route('/:id').get(errorCatchHandler(challengeController.getChallengeById));

export default challengeRouter;
