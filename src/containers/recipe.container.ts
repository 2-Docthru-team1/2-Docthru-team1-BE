import RecipeRepository from '#repositories/recipe.repositories.js';
import RecipeService from '#services/recipe.service.js';
import RecipeController from '#controllers/recipe.controller.js';


const recipeRepository = new RecipeRepository();

const recipeService = new RecipeService(recipeRepository);

const recipeController = new RecipeController(recipeService);

export default recipeController;

