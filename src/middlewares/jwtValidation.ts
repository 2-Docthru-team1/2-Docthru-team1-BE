// import type { NextFunction, Request, Response } from 'express';
// import jwt from 'jsonwebtoken';
// import { JWT_SECRET } from '#configs/jwt.config.js';
// import HTTP_STATUS from '#utils/constants/http-status.js';
// import MESSAGES from '#utils/constants/messages.js';

// export const verifyAccessToken = (req: Request, res: Response, next: NextFunction) => {
//   const token = req.headers.authorization?.split(' ')[1]; // Bearer <token>

//   if (!token) {
//     return res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: MESSAGES.UNAUTHORIZED });
//   }

//   jwt.verify(token, JWT_SECRET, (err, decoded) => {
//     if (err) {
//       return res.status(HTTP_STATUS.FORBIDDEN).json({ message: MESSAGES.FORBIDDEN });
//     }

//     // 인증된 사용자 정보 저장
//     req.user = decoded;
//     next();
//   });
// };
