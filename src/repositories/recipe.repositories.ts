import prismaClient from '#connection/postgres.connection.js';

class RecipeRepository {
  constructor() {
    
  }

  async getRecipes(skip: number, take: number, sortBy: string = 'category', order: string = 'asc') {
    let orderBy;

    if (sortBy === 'likes') {
      orderBy = { likeCount: order }; // 좋아요 수
    } else if (sortBy === 'category') {
      orderBy = { category: order }; // 카테고리
    }

    return await prismaClient.recipe.findMany({
      skip,
      take,
      orderBy,
    });
  }

  async getRecipeById(id: string) {
    return await prismaClient.recipe.findUnique({
      where: { id },
    });
  }

  async getTotalCount() {
    // 전체 레시피 개수
    return await prismaClient.recipe.count();
  }
}

export default RecipeRepository;



