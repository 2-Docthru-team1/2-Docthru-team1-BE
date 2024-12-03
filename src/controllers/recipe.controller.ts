import { Category } from '@prisma/client';
import type { NextFunction, Response } from 'express';
import { assert } from 'superstruct';
import type { RecipeService } from '#services/recipe.service.js';
import type { Request } from '#types/common.types.js';
import type { CreateRecipeDTO, RecipeOptions, RecipeQueries, UpdateRecipeDTO } from '#types/recipe.types.js';
import MESSAGES from '#utils/constants/messages.js';
import { Uuid } from '#utils/struct.js';

export class RecipeController {
  constructor(private recipeService: RecipeService) {}

  getRecipes = async (req: Request<{ query: RecipeQueries }>, res: Response) => {
    const { filter = 'like highest', keyword, page = '1', pageSize = '10' } = req.query;
    let orderBy;
    let category;

    switch (filter) {
      case 'traditional':
        category = Category.Traditional;
        break;
      case 'bunsik':
        category = Category.Bunsik;
        break;
      case 'banchan':
        category = Category.BanChan;
        break;
      case 'dessert':
        category = Category.Dessert;
        break;
      case 'noodle':
        category = Category.Noodle;
        break;
      case 'like highest':
        orderBy = 'highest';
        break;
      case 'like lowest':
        orderBy = 'lowest';
        break;
      default:
    }

    const options: RecipeOptions = {
      orderBy,
      category,
      keyword,
      page: parseInt(page, 10) ?? 1,
      pageSize: parseInt(pageSize, 10) ?? 10,
    };

    const recipes = await this.recipeService.getRecipes(options);

    res.json(recipes);
  };

  getRecipeById = async (req: Request<{ params: { id: string } }>, res: Response) => {
    const { id } = req.params;
    assert(id, Uuid, MESSAGES.WRONG_ID_FORMAT);

    const recipe = await this.recipeService.getRecipeById(id);

    res.json(recipe);
  };

  postRecipe = async (req: Request<{ body: CreateRecipeDTO }>, res: Response, next: NextFunction) => {
    const recipe = await this.recipeService.createRecipe(req.body);

    res.status(201).json(recipe);
  };

  patchRecipe = async (req: Request<{ params: { id: string }; body: UpdateRecipeDTO }>, res: Response, next: NextFunction) => {
    const { id } = req.params;
    assert(id, Uuid, MESSAGES.WRONG_ID_FORMAT);

    const recipe = await this.recipeService.updateRecipe(id, req.body);

    res.json(recipe);
  };

  deleteRecipe = async (req: Request<{ params: { id: string } }>, res: Response, next: NextFunction) => {
    const { id } = req.params;
    assert(id, Uuid, MESSAGES.WRONG_ID_FORMAT);

    const recipe = await this.recipeService.deleteRecipe(id);

    res.json(recipe);
  };

  likeRecipe = async (req: Request<{ params: { id: string } }>, res: Response, next: NextFunction) => {
    const { id } = req.params;
    assert(id, Uuid, MESSAGES.WRONG_ID_FORMAT);

    const recipe = await this.recipeService.likeRecipe(id, req.user!.userId);

    res.sendStatus(204);
  };

  unlikeRecipe = async (req: Request<{ params: { id: string } }>, res: Response, next: NextFunction) => {
    const { id } = req.params;
    assert(id, Uuid, MESSAGES.WRONG_ID_FORMAT);

    const recipe = await this.recipeService.unlikeRecipe(id, req.user!.userId);

    res.sendStatus(204);
  };
}
