import type { Request, Response } from 'express';
import { ErrorMessages } from '#utils/constants/messages.js';
import RecipeService from '#services/recipe.service.js';
import { Category } from '#utils/constants/recipe.enum.js';

class RecipeController {
  private recipeService: RecipeService;

  constructor(recipeService: RecipeService) {
    this.recipeService = recipeService;
  }

  async getRecipes(req: Request, res: Response) {
    try {
      const { page = '1', limit = '10', category, sortBy = 'likes', order = 'asc' } = req.query;

      const pageInt = parseInt(page as string, 10);
      const limitInt = parseInt(limit as string, 10);

      // 카테고리 값이 있는 경우 enum으로 변환
      let categoryEnum: Category | undefined;
      if (category) {
        if (Object.values(Category).includes(category as Category)) {
          categoryEnum = category as Category;
        } else {
          return res.status(400).json({ message: ErrorMessages.INVALID_CATEGORY });
        }
      }

      // 서비스 호출
      const recipes = await this.recipeService.getRecipes(pageInt, limitInt, sortBy as string, order as string, categoryEnum);
      res.status(200).json(recipes);
    } catch (error) {
      console.error(ErrorMessages.ERROR_FETCHING_RECIPES, error);
      res.status(500).json({ message: ErrorMessages.ERROR_FETCHING_RECIPES });
    }
  }
}

export default RecipeController;




