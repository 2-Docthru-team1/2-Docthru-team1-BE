import type { PrismaClient } from '@prisma/client/extension';
import type { IRecipeRepository } from '#interfaces/repositories/recipe.repository.interface.js';
import type { CreateRecipeDTO, RecipeOptions, UpdateRecipeDTO } from '#types/recipe.types.js';

export class RecipeRepository implements IRecipeRepository {
  constructor(private recipe: PrismaClient['recipe']) {}

  getCount = async (options: RecipeOptions) => {
    const { category } = options;
    const count = await this.recipe.count({ where: { category, deletedAt: null } });

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
      where: { category, deletedAt: null },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    return recipes;
  };

  findById = async (id: string) => {
    const recipe = await this.recipe.findUnique({ where: { id, deletedAt: null } });

    return recipe;
  };

  create = async (data: CreateRecipeDTO) => {
    const recipe = await this.recipe.create({ data });

    return recipe;
  };

  update = async (id: string, data: UpdateRecipeDTO) => {
    const recipe = await this.recipe.update({ where: { id, deletedAt: null }, data });

    return recipe;
  };

  delete = async (id: string) => {
    const recipe = await this.recipe.update({ where: { id, deletedAt: null }, data: { deletedAt: new Date() } });

    return recipe;
  };
}
