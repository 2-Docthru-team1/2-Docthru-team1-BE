import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class RecipeRepository {
  async getRecipes(skip: number, take: number) {
    return await prisma.recipe.findMany({
      skip,
      take,
    });
  }

  async getRecipeById(id: string) {
    return await prisma.recipe.findUnique({
      where: { id },
    });
  }
}

export default new RecipeRepository();