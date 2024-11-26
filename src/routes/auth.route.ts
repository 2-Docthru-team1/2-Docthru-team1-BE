import { PrismaClient } from '@prisma/client';
import express, { type NextFunction, type Response } from 'express';
import authController from '#containers/auth.container.js';
import tokenVerifier from '#containers/verify.container.js';
import hashPassword from '#middlewares/hashPassword.js';
import type { SignInDTO } from '#types/auth.types.js';
import type { Request } from '#types/common.types.js';
import createToken from '#utils/createToken.js';

export const authRouter = express.Router();

authRouter.post('/', async (req: Request<{ body: SignInDTO }>, res: Response, next: NextFunction) => {
  console.log('=== Route Handler Start ===');
  console.log('Request Body:', req.body);
  console.log('Request Headers:', req.headers);

  try {
    console.log('Calling controller...');
    const result = await authController.signIn(req, res, next);
    console.log('Controller returned:', result);
  } catch (error) {
    console.log('=== Error in Route Handler ===');
    console.error('Error details:', error);
    next(error);
  }
});

authRouter.post('/signIn', authController.signIn);
authRouter.get('/me', tokenVerifier.verifyAccessToken, authController.getMe);
authRouter.post('/signUp', hashPassword, authController.signUp);
authRouter.post('/refresh', tokenVerifier.verifyRefreshToken, authController.refreshToken);

/*********************************************************************************** test **********************************************************************************************/
authRouter.get('/test/createToken', async (req: Request, res: Response, next: NextFunction) => {
  const prisma = new PrismaClient();

  const [user] = await prisma.user.findMany({ take: 1 });
  const refreshToken = createToken(user, 'refresh');
  const accessToken = createToken(user, 'access');

  res.json({ id: user.id, refreshToken, accessToken });
});

export default authRouter;
