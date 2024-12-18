import express from 'express';
import 'express-async-errors';
import fs from 'fs';
import https from 'https';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import { clientUrl, port } from '#configs/common.config.js';
import errorHandler from '#middlewares/error-handler.js';
import { startJob } from '#utils/jobs/index.js';
import { startSocket } from '#utils/socket/index.js';
import setupMiddlewares from './app.middlewares.js';
import setupRoutes from './app.routes.js';

export const app = express();

setupMiddlewares(app);
setupRoutes(app);
app.use(errorHandler);

let server;
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
  server = https.createServer(options, app);
  server.listen(443, () => {
    console.log('HTTPS Server is running on port 443');
  });

  // HTTP 서버 생성
  createServer(app).listen(80, () => {
    console.log('HTTP Server is running on port 80');
  });

  // HTTP 서버 생성 (미들웨어 밖으로 이동)
  app.listen(80, () => {
    console.log('HTTP Server is running on port 80');
  });
} else {
  // 개발 환경에서는 일반 HTTP 서버로 실행
  server = createServer(app);
  server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

export const io = new Server(server, {
  cors: {
    origin: ['http://localhost:3000', clientUrl],
    credentials: true,
  },
});

try {
  startSocket(io);
} catch (error) {
  console.error('Error in startSocket:', error);
}

try {
  startJob(io);
} catch (error) {
  console.error('Error in startJob:', error);
}
