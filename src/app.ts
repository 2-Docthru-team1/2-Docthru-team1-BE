import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import 'express-async-errors';
import { port } from '#configs/common.config.js';
import errorHandler from '#middlewares/error-handler.js';
import validatePaginationOptions from '#middlewares/pagination.validation.js';
import authRouter from '#routes/auth.route.js';
import challengeRouter from '#routes/challenge.route.js';
import feedbackRouter from '#routes/feedback.route.js';
import userRouter from '#routes/user.route.js';
import workRouter from '#routes/work.route.js';

const app = express();

/*********************************************************************************** middlewares **********************************************************************************************/
app.use(express.json());
app.use(cors({ credentials: true, origin: true }));
app.use(cookieParser());
app.use(validatePaginationOptions);

/*********************************************************************************** routes **********************************************************************************************/
app.use('/auth', authRouter);
app.use('/challenges', challengeRouter);
app.use('/users', userRouter);
app.use('/feedbacks', feedbackRouter);
app.use('/works', workRouter);

/*********************************************************************************** handler **********************************************************************************************/
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
