import type { PrismaClient } from '@prisma/client/extension';
import type { IRecipeRepository } from '#interfaces/repositories/recipe.repository.interface.js';
import type { RecipeOptions } from '#types/recipe.types.js';

export class RecipeRepository implements IRecipeRepository {
  constructor(private recipe: PrismaClient['recipe']) {}

  getCount = async (options: RecipeOptions) => {
    const { category } = options;
    const count = await this.recipe.count({ where: { category } });

    return count;
  };

  findMany = async (options: RecipeOptions) => {
    const { orderBy: order, category, page, pageSize } = options;
    let orderBy = {};
    switch (order) {
      case 'highest':
        orderBy = { likeCount: 'desc' };
        break;
      case 'lowest':
        orderBy = { likeCount: 'asc' };
        break;
      default:
    }

    const recipes = await this.recipe.findMany({
      orderBy,
      where: { category },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    return recipes;
  };

  findById = async (id: string) => {
    const recipe = await this.recipe.findUnique({ where: { id } });

    return recipe;
  };
}
