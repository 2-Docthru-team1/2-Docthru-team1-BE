import RecipeRepository from '../repositories/recipe.repositories.js';

class RecipeService {
  async getRecipes(page: number, limit: number) {
    const skip = (page - 1) * limit;
    return await RecipeRepository.getRecipes(skip, limit);
  }

  async getRecipeById(id: string) {
    return await RecipeRepository.getRecipeById(id);
  }
}

export default new RecipeService();