import { Router } from 'express';
import recipeController from '#containers/recipe.container.js';
import tokenVerifier from '#containers/verify.container.js';

export const recipeRouter = Router();

recipeRouter.route('/').get(recipeController.getRecipes).post(tokenVerifier.verifyAccessToken, recipeController.postRecipe);

recipeRouter
  .route('/:id')
  .get(recipeController.getRecipeById)
  .patch(tokenVerifier.verifyAccessToken, recipeController.patchRecipe)
  .delete(tokenVerifier.verifyAccessToken, recipeController.deleteRecipe);

recipeRouter.route('/:id/like').post().delete();

export default recipeRouter;
