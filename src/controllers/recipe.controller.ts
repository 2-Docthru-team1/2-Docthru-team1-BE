import type { NextFunction, Response } from 'express';
import type { RecipeService } from '#services/recipe.service.js';
import type { Request } from '#types/common.types.js';
import type { CreateRecipeDTO, RecipeOptions, RecipeQueries, UpdateRecipeDTO } from '#types/recipe.types.js';

export class RecipeController {
  constructor(private recipeService: RecipeService) {}

  getRecipes = async (req: Request<{ query: RecipeQueries }>, res: Response) => {
    const { orderBy = 'highest', category, page = '1', pageSize = '10' } = req.query;

    const options: RecipeOptions = {
      orderBy,
      category,
      page: parseInt(page, 10) ?? 1,
      pageSize: parseInt(pageSize, 10) ?? 10,
    };

    const recipes = await this.recipeService.getRecipes(options);

    res.json(recipes);
  };

  getRecipeById = async (req: Request<{ params: { id: string } }>, res: Response) => {
    const { id } = req.params;

    const recipe = await this.recipeService.getRecipeById(id);

    res.json(recipe);
  };

  postRecipe = async (req: Request<{ body: CreateRecipeDTO }>, res: Response, next: NextFunction) => {
    const recipe = await this.recipeService.createRecipe(req.body);

    res.status(201).json(recipe);
  };

  patchRecipe = async (req: Request<{ params: { id: string }; body: UpdateRecipeDTO }>, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const recipe = await this.recipeService.updateRecipe(id, req.body);

    res.json(recipe);
  };

  deleteRecipe = async (req: Request<{ params: { id: string } }>, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const recipe = await this.recipeService.deleteRecipe(id);

    res.json(recipe);
  };
}
