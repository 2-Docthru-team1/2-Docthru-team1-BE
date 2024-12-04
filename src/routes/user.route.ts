import express from 'express';
import userController from '#containers/user.container.js';

export const userRouter = express.Router();

// 여기서 controller의 method를 불러줍니다.
// 메소드의 리턴값이 아니라 메소드 자체를 넘겨주어야 합니다.
// app.method로 입력하지 않도록 주의해주세요. router.method입니다.
userRouter.route('/top-like/:month').get(userController.getTopUsersByLikeCountForMonth);

// app에서 사용할 수 있도록 export 해주어야 합니다.
export default userRouter;
