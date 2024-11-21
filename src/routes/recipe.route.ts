import { Router } from 'express';
import recipeController from '#containers/recipe.container.js';

export const recipeRouter = Router();

recipeRouter.route('/').get(recipeController.getRecipes);

recipeRouter.route('/:id').get(recipeController.getRecipeById);

export default recipeRouter;
