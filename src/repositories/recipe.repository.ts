import type { PrismaClient } from '@prisma/client/extension';
import type { IRecipeRepository } from '#interfaces/repositories/recipe.repository.interface.js';
import type { CreateRecipeDTO, RecipeOptions, UpdateRecipeDTO } from '#types/recipe.types.js';

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

  findById = async (id: string) => {
    const recipe = await this.recipe.findUnique({ where: { id } });

    return recipe;
  };

  create = async (data: CreateRecipeDTO) => {
    const recipe = await this.recipe.create({ data });

    return recipe;
  };

  update = async (id: string, data: UpdateRecipeDTO) => {
    const recipe = await this.recipe.update({ where: { id }, data });

    return recipe;
  };
}
