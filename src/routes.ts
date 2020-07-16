import express from "express";
import RecipeController from "./controllers/RecipeController";

const route = express.Router();
const recipeController = new RecipeController();

route.get("/receitas", recipeController.listAllRecipes);
route.get("/receitas/:id", recipeController.findRecipe);
route.post("/receitas", recipeController.createRecipe);


export default route;