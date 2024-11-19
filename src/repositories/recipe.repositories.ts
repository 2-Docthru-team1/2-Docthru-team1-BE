import prismaClient from '#connection/postgres.connection.js';
import { Category } from '#utils/constants/recipe.enum.js';
import type { PrismaClient } from '@prisma/client';

class RecipeRepository {
  private prisma: PrismaClient;

  // 생성자에서 prismaClient를 받아옴
  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async getRecipes(skip: number, limit: number, sortBy: string, order: string, category?: Category) {
    return await this.prisma.recipe.findMany({
      skip,
      take: limit,
      where: category ? { category } : undefined,
      orderBy: {
        [sortBy]: order,
      },
    });
  }

  async getRecipeById(id: string) {
    return await this.prisma.recipe.findUnique({
      where: { id },
    });
  }

  async getTotalCount() {
    return await this.prisma.recipe.count();
  }
}

export default RecipeRepository;







