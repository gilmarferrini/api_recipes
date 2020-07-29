import express from "express";
import RecipeController from "./controllers/RecipeController";
import checkBody from "./middlewares/checkBody";

const route = express.Router();
const recipeController = new RecipeController();

route.get("/receitas", recipeController.index);
route.get("/receitas/:id", recipeController.find);
route.post("/receitas", checkBody, recipeController.create);
route.put("/receitas/:id", checkBody, recipeController.update);
route.delete("/receitas/:id", recipeController.delete);

export default route;