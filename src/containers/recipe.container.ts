import prismaClient from '#connection/postgres.connection.js';
import { RecipeController } from '#controllers/recipe.controller.js';
import { RecipeRepository } from '#repositories/recipe.repository.js';
import { RecipeService } from '#services/recipe.service.js';

const recipeRepository = new RecipeRepository(prismaClient.recipe);
const recipeService = new RecipeService(recipeRepository);
const recipeController = new RecipeController(recipeService);

export default recipeController;
