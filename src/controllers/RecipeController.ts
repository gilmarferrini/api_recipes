import { Request, Response } from "express";
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

  async listAllRecipes(req: Request, res: Response) {
    const allRecipes = await Recipe.find({})
    const newShortID = await this.generateShortID();
    console.log(newShortID);
    return res.json(allRecipes);
  }

  async createRecipe(req: Request, res: Response) {
    const { name, photoUrl, ingredients, stepByStep, additionalInformation } = req.body;
    const newRecipe: IRecipe = {
      shortID: 1,
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

  private async generateShortID() {
    const allRecipes = await Recipe.find({})
    const lastShortID: number = allRecipes[allRecipes.length - 1].toObject().shortID;
    return lastShortID;
  }
  
}

export default RecipeController;