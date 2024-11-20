import type { Request, Response, NextFunction } from 'express';
import { ErrorMessages } from '#utils/constants/messages.js';
import RecipeService from '#services/recipe.service.js';
import { Category, SortBy, Order } from '#utils/constants/enum.js';

class RecipeController {
  constructor(private recipeService: RecipeService) {}

  // 레시피 목록 조회
  getRecipes = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { page = '1', limit = '10', category, sortBy = SortBy.LIKES, order = Order.latestFirst } = req.query;

      const pageInt = parseInt(page as string, 10);
      const limitInt = parseInt(limit as string, 10);

      // 카테고리 값 검증 및 변환
      let categoryEnum: Category | undefined;
      if (category) {
        if (Object.values(Category).includes(category as Category)) {
          categoryEnum = category as Category;
        } else {
          // 에러 핸들러
          return next(new Error(ErrorMessages.INVALID_CATEGORY));
        }
      }

      
      if (!Object.values(SortBy).includes(sortBy as SortBy)) {
        return next(new Error(ErrorMessages.INVALID_SORT_BY));
      }

      if (!Object.values(Order).includes(order as Order)) {
        return next(new Error(ErrorMessages.INVALID_ORDER));
      }

      const recipes = await this.recipeService.getRecipes(
        pageInt,
        limitInt,
        sortBy as SortBy,
        order as Order,
        categoryEnum
      );

      res.status(200).json(recipes);
    } catch (error) {
      next(error);
    }
  };
}

export default RecipeController;
