import express from "express";
import RecipeController from "./controllers/RecipeController";
import checkBody from "./middlewares/checkBody";

const route = express.Router();
const recipeController = new RecipeController();

route.get("/receitas", recipeController.index);
route.get("/receitas/:id", recipeController.findRecipe);
route.post("/receitas", checkBody, recipeController.createRecipe);
route.put("/receitas/:id", checkBody, recipeController.updateRecipe);
route.delete("/receitas/:id", recipeController.deleteRecipe);

export default route;