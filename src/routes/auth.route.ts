import hashPassword from '#middlewares/hashPassword.js';
import { verifyRefreshToken } from '#middlewares/verifyTokens.js';
import { PrismaClient } from '@prisma/client';
import express, { type NextFunction, type Request, type Response } from 'express';
import authController from '#containers/auth.container.js';
import createToken from '#utils/createToken.js';

export const authRouter = express.Router();

// 여기서 controller의 method를 불러줍니다.
// 메소드의 리턴값이 아니라 메소드 자체를 넘겨주어야 합니다.
// app.method로 입력하지 않도록 주의해주세요. router.method입니다.
authRouter.post('/signUp', hashPassword, authController.signUp);

authRouter.post('/refresh', verifyRefreshToken, authController.refreshToken);

/*********************************************************************************** test **********************************************************************************************/
authRouter.get('/test/createToken', async (req: Request, res: Response, next: NextFunction) => {
  const prisma = new PrismaClient();

  const [user] = await prisma.user.findMany({ take: 1 });
  const refreshToken = createToken(user, 'refresh');
  const accessToken = createToken(user, 'access');

  res.json({ refreshToken, accessToken });
});

// app에서 사용할 수 있도록 export 해주어야 합니다.
export default authRouter;
