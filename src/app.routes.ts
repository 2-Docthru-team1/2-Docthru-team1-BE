import express from 'express';
import authRouter from '#routes/auth.route.js';
import challengeRouter from '#routes/challenge.route.js';
import feedbackRouter from '#routes/feedback.route.js';
import recipeRouter from '#routes/recipe.route.js';
import userRouter from '#routes/user.route.js';
import workRouter from '#routes/work.route.js';

export default function setupRoutes(app: express.Application) {
  app.use('/auth', authRouter);
  app.use('/challenges', challengeRouter);
  app.use('/users', userRouter);
  app.use('/feedbacks', feedbackRouter);
  app.use('/works', workRouter);
  app.use('/recipes', recipeRouter);

  app.get('/hello', (req, res) => {
    res.send('Hello World');
  });
}
