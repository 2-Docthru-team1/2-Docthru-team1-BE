import type { Request, Response, NextFunction } from 'express';
import { ErrorMessages } from '#utils/constants/messages.js';
import RecipeService from '#services/recipe.service.js';
import { Category, SortBy, Order } from '#utils/constants/enum.js';
import { validatePaginationParams } from '#utils/validators/pagination.js';

class RecipeController {
  constructor(private recipeService: RecipeService) {}

  // 레시피 목록 조회
  getRecipes = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { page = '1', limit = '10', category, sortBy = SortBy.LIKES, order = Order.latestFirst } = req.query;

      // 페이지네이션 유효성 검증
      const { pageInt, limitInt } = validatePaginationParams(page as string, limit as string);

      // 카테고리 값 검증 및 변환
      let categoryEnum: Category | undefined;
      if (category) {
        if (Object.values(Category).includes(category as Category)) {
          categoryEnum = category as Category;
        } else {
          return next(new Error(ErrorMessages.INVALID_CATEGORY));
        }
      }

      // sortBy와 order 값 검증
      if (!Object.values(SortBy).includes(sortBy as SortBy)) {
        return next(new Error(ErrorMessages.INVALID_SORT_BY));
      }

      if (!Object.values(Order).includes(order as Order)) {
        return next(new Error(ErrorMessages.INVALID_ORDER));
      }

      // 서비스 호출 시 파라미터를 객체로 전달
      const recipes = await this.recipeService.getRecipes({
        page: pageInt,
        limit: limitInt,
        sortBy: sortBy as SortBy,
        order: order as Order,
        category: categoryEnum,
      });

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
        return next(new Error(ErrorMessages.RECIPE_NOT_FOUND));
      }
    } catch (error) {
      next(error);
    }
  };
}

export default RecipeController;




