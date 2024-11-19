import { Router } from 'express';
import recipeController from '#containers/recipe.container.js';

const router = Router();

// 레시피 목록 조회 API
router.get('/recipes', recipeController.getRecipes);

// 레시피 개별 조회 API
router.get('/recipes/:id', recipeController.getRecipeById);

export default router;

