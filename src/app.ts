import cookieParser from 'cookie-parser';
import cors from 'cors';
import { randomUUID } from 'crypto';
import express from 'express';
import 'express-async-errors';
import { port } from '#configs/common.config.js';
import { runAsyncLocalStorage } from '#middlewares/asyncLocalStorage.js';
import errorHandler from '#middlewares/error-handler.js';
import validatePaginationOptions from '#middlewares/pagination.validation.js';
import authRouter from '#routes/auth.route.js';
import challengeRouter from '#routes/challenge.route.js';
import feedbackRouter from '#routes/feedback.route.js';
import userRouter from '#routes/user.route.js';
import workRouter from '#routes/work.route.js';
import { generatePresignedDownloadUrl } from '#utils/S3/generate-presigned-download-url.js';
import { generatePresignedUploadUrl } from '#utils/S3/generate-presigned-upload-url.js';

const app = express();

/*********************************************************************************** middlewares **********************************************************************************************/
app.use(express.json());
app.use(cors({ credentials: true, origin: true }));
app.use(cookieParser());
app.use(validatePaginationOptions);
app.use(runAsyncLocalStorage);

/*********************************************************************************** routes **********************************************************************************************/
app.use('/auth', authRouter);
app.use('/challenges', challengeRouter);
app.use('/users', userRouter);
app.use('/feedbacks', feedbackRouter);
app.use('/works', workRouter);

app.get('/hello', (req, res) => {
  res.send('Hello World');
});
app.get('/s3-download', async (req, res) => {
  const url = await generatePresignedDownloadUrl('GoogleBtn.png');
  res.send({ url });
});
app.get('/s3-upload', async (req, res) => {
  const s3Key = `userId/${randomUUID()}`;
  const url = await generatePresignedUploadUrl(s3Key, 'text/plain');
  res.send({ url });
});

/*********************************************************************************** handler **********************************************************************************************/
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
