import type RecipeRepository from '#repositories/recipe.repositories.js';
import { Category } from '#utils/constants/recipe.enum.js';

class RecipeService {
  private recipeRepository: RecipeRepository;

  constructor(recipeRepository: RecipeRepository) {
    this.recipeRepository = recipeRepository;
  }

  async getRecipes(page: number, limit: number, sortBy: string = 'likes', order: string = 'asc', category?: Category) {
    const skip = (page - 1) * limit;
    const [recipes, totalCount] = await Promise.all([
      this.recipeRepository.getRecipes(skip, limit, sortBy, order, category),
      this.recipeRepository.getTotalCount(),
    ]);

    
    return {
      list: recipes,
      totalCount: totalCount,
    };
  }

  async getRecipeById(id: string) {
    return await this.recipeRepository.getRecipeById(id);
  }
}

export default RecipeService;






