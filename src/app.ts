import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import 'express-async-errors';
import fs from 'fs';
import https from 'https';
import { port } from '#configs/common.config.js';
import { runAsyncLocalStorage } from '#middlewares/asyncLocalStorage.js';
import errorHandler from '#middlewares/error-handler.js';
import validatePaginationOptions from '#middlewares/pagination.validation.js';
import authRouter from '#routes/auth.route.js';
import challengeRouter from '#routes/challenge.route.js';
import feedbackRouter from '#routes/feedback.route.js';
import recipeRouter from '#routes/recipe.route.js';
import userRouter from '#routes/user.route.js';
import workRouter from '#routes/work.route.js';
import { startJob } from '#utils/jobs/index.js';

const app = express();

startJob();
console.log('start');

/*********************************************************************************** middlewares **********************************************************************************************/
app.use(express.json());
app.use(cors({ credentials: true, origin: '*' }));
app.use(cookieParser());
app.use(validatePaginationOptions);
app.use(runAsyncLocalStorage);

app.use((req, res, next) => {
  console.log(`Request Path: ${req.path}`);
  console.log(`Request Method: ${req.method}`);
  next();
});
console.log('middlewares');

/*********************************************************************************** routes **********************************************************************************************/
console.log('routes');
app.use('/auth', authRouter);
app.use('/challenges', challengeRouter);
app.use('/users', userRouter);
app.use('/feedbacks', feedbackRouter);
app.use('/works', workRouter);
app.use('/recipes', recipeRouter);

app.get('/hello', (req, res) => {
  res.send('Hello World');
});

/*********************************************************************************** handler **********************************************************************************************/
app.use(errorHandler);

if (port === '443') {
  let sslOptions;

  try {
    sslOptions = {
      key: fs.readFileSync('/etc/ssl/private/private.key'),
      cert: fs.readFileSync('/etc/ssl/certs/certificate.crt'),
    };
  } catch (error) {
    sslOptions = {
      key: fs.readFileSync('D:/ssl/private.key'),
      cert: fs.readFileSync('D:/ssl/certificate.crt'),
    };
  }

  const options = sslOptions;

  // HTTPS 리다이렉션 미들웨어
  app.use((req, res, next) => {
    if (!req.secure) {
      return res.redirect(['https://', req.get('Host'), req.url].join(''));
    }
    next();
  });

  // HTTPS 서버 생성 (미들웨어 밖으로 이동)
  https.createServer(options, app).listen(443, () => {
    console.log('HTTPS Server is running on port 443');
  });

  // HTTP 서버 생성 (미들웨어 밖으로 이동)
  app.listen(80, () => {
    console.log('HTTP Server is running on port 80');
  });
} else {
  // 개발 환경에서는 일반 HTTP 서버로 실행
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}
