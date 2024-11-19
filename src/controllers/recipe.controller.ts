import type { Request, Response } from 'express';
import { ErrorMessages } from '#utils/constants/messages.js';
import RecipeService from '#services/recipe.service.js';

class RecipeController {
  private recipeService: RecipeService;

  constructor(recipeService: RecipeService) {
    this.recipeService = recipeService;
  }

  async getRecipes(req: Request, res: Response) {
    try {
      const { page = '1', limit = '10' } = req.query;
      const pageParsed = parseInt(page as string, 10);
      const limitParsed = parseInt(limit as string, 10);
      const recipes = await this.recipeService.getRecipes(pageParsed, limitParsed);
      res.status(200).json(recipes);
    } catch (error) {
      console.error(ErrorMessages.ERROR_FETCHING_RECIPES, error);
      res.status(500).json({ message: ErrorMessages.ERROR_FETCHING_RECIPES });
    }
  }

  async getRecipeById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const recipe = await this.recipeService.getRecipeById(id);
      if (recipe) {
        res.status(200).json(recipe);
      } else {
        res.status(404).json({ message: ErrorMessages.RECIPE_NOT_FOUND });
      }
    } catch (error) {
      console.error(ErrorMessages.ERROR_FETCHING_RECIPE, error);
      res.status(500).json({ message: ErrorMessages.ERROR_FETCHING_RECIPE });
    }
  }
}

export default RecipeController;



