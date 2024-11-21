import type { Recipe } from '@prisma/client';
import type { CreateRecipeDTO, RecipeOptions, UpdateRecipeDTO } from '#types/recipe.types.js';

export interface IRecipeRepository {
  getCount(options: RecipeOptions): Promise<number>;
  findMany(options: RecipeOptions): Promise<Recipe[]>;
  findById(id: string): Promise<Recipe | null>;
  create(recipeData: CreateRecipeDTO): Promise<Recipe>;
  update(id: string, recipeData: UpdateRecipeDTO): Promise<Recipe>;
  delete(id: string): Promise<Recipe>;
}
