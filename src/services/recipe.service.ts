import type RecipeRepository from '#repositories/recipe.repositories.js';
import { Category, SortBy, Order } from '#utils/constants/enum.js';

class RecipeService {
  private recipeRepository: RecipeRepository;

  constructor(recipeRepository: RecipeRepository) {
    this.recipeRepository = recipeRepository;
  }

  // 총 5개의 매개변수를 받을 수 있도록 수정
  async getRecipes(page: number, limit: number, sortBy: SortBy, order: Order, category?: Category) {
    const skip = (page - 1) * limit;

    // 레포지토리에서 레시피 목록과 총 개수 조회
    const [recipes, totalCount] = await Promise.all([
      this.recipeRepository.getRecipes(skip, limit, sortBy, order, category),
      this.recipeRepository.getTotalCount(category),
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











