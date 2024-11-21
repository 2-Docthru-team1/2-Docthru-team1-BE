import type { Recipe } from '@prisma/client';
import type { RecipeOptions } from '#types/recipe.types.js';

export interface IRecipeService {
  gerRecipes(options: RecipeOptions): Promise<{ list: Recipe[]; totalCount: number }>;
  // getRecipeById(id: string): Promise<Recipe | null>;
  // createRecipe(recipeData: CreateRecipeDTO): Promise<Recipe>;
  // updateRecipe(id: string, recipeData: UpdateRecipeDTO): Promise<Recipe>;
  // deleteRecipe(id: string): Promise<Recipe>;
}
