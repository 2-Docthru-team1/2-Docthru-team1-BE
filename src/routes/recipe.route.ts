import { Router } from 'express';
import recipeController from '#containers/recipe.container.js';

export const recipeRouter = Router();

recipeRouter.route('/').get(recipeController.getRecipes).post(recipeController.postRecipe);

recipeRouter
  .route('/:id')
  .get(recipeController.getRecipeById)
  .patch(recipeController.patchRecipe)
  .delete(recipeController.deleteRecipe);

export default recipeRouter;
