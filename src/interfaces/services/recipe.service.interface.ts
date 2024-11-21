import type { Recipe } from '@prisma/client';
import type { CreateRecipeDTO, RecipeOptions, UpdateRecipeDTO } from '#types/recipe.types.js';

export interface IRecipeService {
  getRecipes(options: RecipeOptions): Promise<{ list: Recipe[]; totalCount: number }>;
  getRecipeById(id: string): Promise<Recipe | null>;
  createRecipe(recipeData: CreateRecipeDTO): Promise<Recipe>;
  updateRecipe(id: string, recipeData: UpdateRecipeDTO): Promise<Recipe>;
  deleteRecipe(id: string): Promise<Recipe>;
}
