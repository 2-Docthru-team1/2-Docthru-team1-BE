import errorHandler from '#middlewares/error-handler.js';
import validatePaginationOptions from '#middlewares/pagination.validation.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import 'express-async-errors';
import { port } from '#configs/common.config.js';
import authRouter from '#routes/auth.route.js';
import challengeRouter from '#routes/challenge.route.js';
import requestRouter from '#routes/request.route.js';
import userRouter from '#routes/user.route.js';

const app = express();

/*********************************************************************************** middlewares **********************************************************************************************/
app.use(express.json());
app.use(cors({ credentials: true, origin: true }));
app.use(cookieParser());
app.use(validatePaginationOptions);

/*********************************************************************************** routes **********************************************************************************************/
app.use('/auth', authRouter);
app.use('/challenge', challengeRouter);
app.use('/request', requestRouter);
app.use('/user', userRouter);

/*********************************************************************************** handler **********************************************************************************************/
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
