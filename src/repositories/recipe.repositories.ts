import type { PrismaClient } from '@prisma/client';
import { SortBy, Order } from '#utils/constants/enum.js';

class RecipeRepository {
  private recipe;

  constructor(prisma: PrismaClient) {
    this.recipe = prisma.recipe;
  }

  async getRecipes(skip: number, take: number, sortBy: SortBy, order: Order, category?: string) {
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










