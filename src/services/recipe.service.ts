import type RecipeRepository from '#repositories/recipe.repositories.js';
import { Category, SortBy, Order } from '#utils/constants/enum.js';

interface GetRecipeParams {
  page: number;
  limit: number;
  sortBy: SortBy;
  order: Order;
  category?: Category;
}

class RecipeService {
  private recipeRepository: RecipeRepository;

  constructor(recipeRepository: RecipeRepository) {
    this.recipeRepository = recipeRepository;
  }

  // 레시피 목록 조회 
  async getRecipes(params: GetRecipeParams) {
    const { page, limit, sortBy, order, category } = params;

    const skip = (page - 1) * limit;

    
    const [recipes, totalCount] = await Promise.all([
      this.recipeRepository.getRecipes(skip, limit, sortBy, order, category),
      this.recipeRepository.getTotalCount(category),
    ]);

    return {
      list: recipes,
      totalCount: totalCount,
    };
  }

  // 레시피 개별 조회
  async getRecipeById(id: string) {
    return await this.recipeRepository.getRecipeById(id);
  }
}

export default RecipeService;












