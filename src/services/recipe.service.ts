import type RecipeRepository from '#repositories/recipe.repositories.js';

class RecipeService {
  private recipeRepository: RecipeRepository;

  constructor(recipeRepository: RecipeRepository) {
    this.recipeRepository = recipeRepository;
  }

  async getRecipes(page: number, limit: number, sortBy: string = 'category', order: string = 'asc') {
    const skip = (page - 1) * limit;
    const [recipes, totalCount] = await Promise.all([
      this.recipeRepository.getRecipes(skip, limit, sortBy, order),
      this.recipeRepository.getTotalCount(),
    ]);
    return { recipes, totalCount };
  }
  

  async getRecipeById(id: string) {
    return await this.recipeRepository.getRecipeById(id);
  }
}

export default RecipeService;


