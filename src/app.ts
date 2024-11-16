import express, { type Request, type Response } from 'express';
import 'express-async-errors';
import { port } from '#configs/common.config.js';
import authRouter from '#routes/auth.route.js';
import challengeRouter from '#routes/challenge.route.js';
import requestRouter from '#routes/request.route.js';
import userRouter from '#routes/user.route.js';
import recipeRouter from '#routes/recipe.route.js';

const app = express();

app.use(express.json());

/*********************************************************************************** routes **********************************************************************************************/
app.use('/auth', authRouter);
app.use('/challenge', challengeRouter);
app.use('/request', requestRouter);
app.use('/user', userRouter);
app.use('/recipes', recipeRouter);

/*********************************************************************************** handler **********************************************************************************************/

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Hello, TypeScript with Express!' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
