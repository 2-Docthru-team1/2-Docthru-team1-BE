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
    if (order) {
      orderBy = order === 'highest' ? { likeCount: 'desc' } : { likeCount: 'asc' };
    }

    const recipes = await this.recipe.findMany({
      orderBy,
      where: { category },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    return recipes;
  };
}
