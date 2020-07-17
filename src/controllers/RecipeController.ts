import { Request, Response, response } from "express";
import Recipe from "../models/RecipeSchema";

interface IRecipe {
  shortID: number,
  photoUrl: string
  name: string,
  ingredients: string[],
  stepByStep: string[],
  additionalInformation: string
}

class RecipeController {

  async listAllRecipes(req: Request, res: Response): Promise<Response> {
    const allRecipes = await Recipe.find({});
    return res.json(allRecipes);
  }

  async findRecipe(req: Request, res: Response) {
    const { id } = req.params;
    const recipeRequired = await Recipe.find({ shortID: Number(id) });
    return res.json(recipeRequired);
  }

  async createRecipe(req: Request, res: Response): Promise<Response> {
    const { name, photoUrl, ingredients, stepByStep, additionalInformation } = req.body;

    const allRecipes = await Recipe.find({});
    const lastRecipeShortID: number = allRecipes[allRecipes.length - 1].toObject()["shortID"];
    const newShortID: number = lastRecipeShortID + 1;

    const newRecipe: IRecipe = {
      shortID: (allRecipes.length === 0) ? 1 : newShortID,
      name,
      photoUrl,
      ingredients,
      stepByStep,
      additionalInformation,
    };

    await Recipe.create({ ...newRecipe })
      .then( response => console.log(true))
      .catch( err => console.log(false))
    return res.json(newRecipe);
  }


}

export default RecipeController;