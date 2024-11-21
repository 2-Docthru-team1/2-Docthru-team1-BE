import type { NextFunction, Response } from 'express';
import type { RecipeService } from '#services/recipe.service.js';
import type { Request } from '#types/common.types.js';
import type { RecipeOptions, RecipeQueries } from '#types/recipe.types.js';

export class RecipeController {
  constructor(private recipeService: RecipeService) {}

  getRecipes = async (req: Request<{ query: RecipeQueries }>, res: Response, next: NextFunction) => {
    const { orderBy = 'highest', category, page = '1', pageSize = '10' } = req.query;

    const options: RecipeOptions = {
      orderBy,
      category,
      page: parseInt(page, 10) ?? 1,
      pageSize: parseInt(pageSize, 10) ?? 10,
    };

    const recipes = await this.recipeService.gerRecipes(options);

    res.json(recipes);
  };
}
