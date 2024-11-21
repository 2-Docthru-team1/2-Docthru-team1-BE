import type { IRecipeService } from '#interfaces/services/recipe.service.interface.js';
import type { RecipeRepository } from '#repositories/recipe.repository.js';
import type { RecipeOptions } from '#types/recipe.types.js';

export class RecipeService implements IRecipeService {
  constructor(private recipeRepository: RecipeRepository) {}

  gerRecipes = async (options: RecipeOptions) => {
    const recipes = await this.recipeRepository.findMany(options);
    const totalCount = await this.recipeRepository.getCount(options);

    // recipes.forEach((recipe: Recipe) => {
    //   recipe.benefits = JSON.parse(recipe.benefits as string);
    // });

    return { list: recipes, totalCount };
  };
}
