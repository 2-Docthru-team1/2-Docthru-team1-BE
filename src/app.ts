<<<<<<< HEAD

import express, { type Request, type Response, type NextFunction } from 'express';
=======
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
>>>>>>> d7732ca8d98ebc4b8308e912ae4a88687bf2a590
import 'express-async-errors';
import { port } from '#configs/common.config.js';
import { runAsyncLocalStorage } from '#middlewares/asyncLocalStorage.js';
import errorHandler from '#middlewares/error-handler.js';
import validatePaginationOptions from '#middlewares/pagination.validation.js';
import authRouter from '#routes/auth.route.js';
import challengeRouter from '#routes/challenge.route.js';
import feedbackRouter from '#routes/feedback.route.js';
import userRouter from '#routes/user.route.js';
<<<<<<< HEAD
import recipeRouter from '#routes/recipe.route.js';
=======
import workRouter from '#routes/work.route.js';
>>>>>>> d7732ca8d98ebc4b8308e912ae4a88687bf2a590

const app = express();

/*********************************************************************************** middlewares **********************************************************************************************/
app.use(express.json());
app.use(cors({ credentials: true, origin: true }));
app.use(cookieParser());
app.use(validatePaginationOptions);
app.use(runAsyncLocalStorage);

/*********************************************************************************** routes **********************************************************************************************/
app.use('/auth', authRouter);
app.use('/challenge', challengeRouter);
app.use('/user', userRouter);
<<<<<<< HEAD
app.use('/recipes', recipeRouter);
=======
app.use('/feedback', feedbackRouter);
app.use('/work', workRouter);
>>>>>>> d7732ca8d98ebc4b8308e912ae4a88687bf2a590

app.get('/hello', (req, res) => {
  res.send('Hello World');
});

<<<<<<< HEAD
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Error:', error.message);
  res.status(500).json({ message: '서버 에러가 발생했습니다.' });
});

=======
/*********************************************************************************** handler **********************************************************************************************/
app.use(errorHandler);
>>>>>>> d7732ca8d98ebc4b8308e912ae4a88687bf2a590
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
