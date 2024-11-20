import { PrismaClient } from '@prisma/client';
import express, { type NextFunction, type Response } from 'express';
import authController from '#containers/auth.container.js';
import hashPassword from '#middlewares/hashPassword.js';
import { verifyRefreshToken } from '#middlewares/verifyTokens.js';
import type { Request } from '#types/common.types.js';
import createToken from '#utils/createToken.js';

export const authRouter = express.Router();

authRouter.post('/signIn', authController.signIn);
authRouter.post('/signUp', hashPassword, authController.signUp);
authRouter.post('/refresh', verifyRefreshToken, authController.refreshToken);

// 로그인한 사용자만 접근 가능
// authRouter.get('/profile', verifyAccessToken, authController.getProfile);
// authRouter.get('/settings', verifyAccessToken, authController.getSettings);

/*********************************************************************************** test **********************************************************************************************/
authRouter.get('/test/createToken', async (req: Request, res: Response, next: NextFunction) => {
  const prisma = new PrismaClient();

  const [user] = await prisma.user.findMany({ take: 1 });
  const refreshToken = createToken(user, 'refresh');
  const accessToken = createToken(user, 'access');

  res.json({ id: user.id, refreshToken, accessToken });
});

export default authRouter;
