import type { IRecipeService } from '#interfaces/services/recipe.service.interface.js';
import type { RecipeRepository } from '#repositories/recipe.repository.js';
import { BadRequest } from '#types/http-error.types.js';
import type { CreateRecipeDTO, RecipeOptions, UpdateRecipeDTO } from '#types/recipe.types.js';
import { generatePresignedDownloadUrl } from '#utils/S3/generate-presigned-download-url.js';
import assertExist from '#utils/assertExist.js';
import MESSAGES from '#utils/constants/messages.js';

export class RecipeService implements IRecipeService {
  constructor(private recipeRepository: RecipeRepository) {}

  getRecipes = async (options: RecipeOptions) => {
    const recipes = await this.recipeRepository.findMany(options);
    const totalCount = await this.recipeRepository.getCount(options);

    const newRecipes = await Promise.all(
      recipes.map(async recipe => {
        const images: string[] = [];
        await Promise.all(
          recipe.images.map(async image => {
            const url = await generatePresignedDownloadUrl(image);
            images.push(url);
          }),
        );

        recipe.images = images;
        return recipe;
      }),
    );

    return { list: newRecipes, totalCount };
  };

  getRecipeById = async (id: string) => {
    const recipe = await this.recipeRepository.findById(id);
    assertExist(recipe);

    const images: string[] = [];
    await Promise.all(
      recipe.images.map(async image => {
        const url = await generatePresignedDownloadUrl(image);
        images.push(url);
      }),
    );
    recipe.images = images;

    return recipe;
  };

  createRecipe = async (data: CreateRecipeDTO) => {
    const recipe = await this.recipeRepository.create(data);

    return recipe;
  };

  updateRecipe = async (id: string, data: UpdateRecipeDTO) => {
    const recipe = await this.recipeRepository.findById(id);
    assertExist(recipe);

    const newRecipe = await this.recipeRepository.update(id, data);

    return newRecipe;
  };

  deleteRecipe = async (id: string) => {
    const recipe = await this.recipeRepository.delete(id);
    assertExist(recipe);

    return recipe;
  };

  likeRecipe = async (recipeId: string, userId: string) => {
    const recipe = await this.recipeRepository.findById(recipeId);
    assertExist(recipe);

    const isLiked = await this.recipeRepository.isLiked(recipeId, userId);
    if (isLiked) {
      throw new BadRequest(MESSAGES.BAD_REQUEST);
    }
    const result = await this.recipeRepository.like(recipeId, userId);

    return result;
  };

  unlikeRecipe = async (recipeId: string, userId: string) => {
    const recipe = await this.recipeRepository.findById(recipeId);
    assertExist(recipe);

    const isLiked = await this.recipeRepository.isLiked(recipeId, userId);
    if (!isLiked) {
      throw new BadRequest(MESSAGES.BAD_REQUEST);
    }
    const result = await this.recipeRepository.unlike(recipeId, userId);

    return result;
  };
}
