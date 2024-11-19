import type { Request, Response, NextFunction } from 'express';
import { ErrorMessages } from '#utils/constants/messages.js';
import RecipeService from '#services/recipe.service.js';
import { Category } from '#utils/constants/recipe.enum.js';

class RecipeController {
  constructor(private recipeService: RecipeService) {}

  // 레시피 목록 조회
  getRecipes = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { page = '1', limit = '10', category, sortBy = 'likes', order = 'asc' } = req.query;

      const pageInt = parseInt(page as string, 10);
      const limitInt = parseInt(limit as string, 10);

      
      let categoryEnum: Category | undefined;
      if (category) {
        if (Object.values(Category).includes(category as Category)) {
          categoryEnum = category as Category;
        } else {
          return res.status(400).json({ message: ErrorMessages.INVALID_CATEGORY });
        }
      }

      const recipes = await this.recipeService.getRecipes(pageInt, limitInt, sortBy as string, order as string, categoryEnum);
      res.status(200).json(recipes);
    } catch (error) {
      next(error); 
    }
  };

  // 레시피 개별 조회
  getRecipeById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const recipe = await this.recipeService.getRecipeById(id);
      if (recipe) {
        res.status(200).json(recipe);
      } else {
        res.status(404).json({ message: ErrorMessages.RECIPE_NOT_FOUND });
      }
    } catch (error) {
      next(error); 
    }
  };
}

export default RecipeController;
