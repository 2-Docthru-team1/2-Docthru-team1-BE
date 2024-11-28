import type { IRecipeRepository } from '#interfaces/repositories/recipe.repository.interface.js';
import type { ExtendedPrismaClient } from '#types/common.types.js';
import type { CreateRecipeDTO, RecipeOptions, UpdateRecipeDTO } from '#types/recipe.types.js';

export class RecipeRepository implements IRecipeRepository {
  constructor(private recipe: ExtendedPrismaClient['recipe']) {}

  getCount = async (options: RecipeOptions) => {
    const { category, keyword } = options;
    const count = await this.recipe.count({ where: { category, title: { contains: keyword } } });

    return count;
  };

  findMany = async (options: RecipeOptions) => {
    const { orderBy: order, category, keyword, page, pageSize } = options;
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
      where: { category, title: { contains: keyword } },
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

  delete = async (id: string) => {
    const recipe = await this.recipe.update({ where: { id }, data: { deletedAt: new Date() } });

    return recipe;
  };

  like = async (recipeId: string, userId: string) => {
    const recipe = await this.recipe.update({
      where: { id: recipeId },
      data: {
        likeCount: { increment: 1 },
        likeUsers: { connect: { id: userId } },
      },
    });

    return recipe;
  };

  unlike = async (recipeId: string, userId: string) => {
    const recipe = await this.recipe.update({
      where: { id: recipeId },
      data: {
        likeCount: { decrement: 1 },
        likeUsers: { disconnect: { id: userId } },
      },
    });

    return recipe;
  };

  isLiked = async (recipeId: string, userId: string) => {
    const recipe = await this.recipe.findFirst({
      where: {
        id: recipeId,
        likeUsers: { some: { id: userId } },
      },
    });

    return !!recipe;
  };
}
