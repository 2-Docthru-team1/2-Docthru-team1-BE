import type { IRecipeService } from '#interfaces/services/recipe.service.interface.js';
import type { RecipeRepository } from '#repositories/recipe.repository.js';
import type { CreateRecipeDTO, RecipeOptions } from '#types/recipe.types.js';

export class RecipeService implements IRecipeService {
  constructor(private recipeRepository: RecipeRepository) {}

  gerRecipes = async (options: RecipeOptions) => {
    const recipes = await this.recipeRepository.findMany(options);
    const totalCount = await this.recipeRepository.getCount(options);

    return { list: recipes, totalCount };
  };

  getRecipeById = async (id: string) => {
    const recipe = await this.recipeRepository.findById(id);

    return recipe;
  };

  createRecipe = async (data: CreateRecipeDTO) => {
    const recipe = await this.recipeRepository.create(data);

    return recipe;
  };
}
