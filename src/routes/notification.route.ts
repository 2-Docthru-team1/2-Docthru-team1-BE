import express from 'express';
import notificationController from '#containers/notification.container.js';
import tokenVerifier from '#containers/verify.container.js';

export const notificationRouter = express.Router();

notificationRouter.get('/', tokenVerifier.verifyAccessToken, notificationController.getNotifications);

export default notificationRouter;
