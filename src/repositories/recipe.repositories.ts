import type { PrismaClient } from '@prisma/client';

class RecipeRepository {
  private recipe; // Prisma의 recipe 모델을 명확히 선언합니다.

  constructor(prisma: PrismaClient) {
    this.recipe = prisma.recipe;  // Prisma Client의 recipe 모델을 직접 할당합니다.
  }

  async getRecipes(skip: number, take: number, sortBy: string, order: string, category?: string) {
    return await this.recipe.findMany({
      skip,
      take,
      orderBy: {
        [sortBy]: order,
      },
      where: category ? { category } : {},
    });
  }

  async getRecipeById(id: string) {
    return await this.recipe.findUnique({
      where: { id },
    });
  }

  async getTotalCount(category?: string) {
    return await this.recipe.count({
      where: category ? { category } : {},
    });
  }
}

export default RecipeRepository;









