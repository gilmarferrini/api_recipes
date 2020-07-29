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

  async index(req: Request, res: Response): Promise<Response> {
    let { page = 1} = req.query;
    page = Number(page);
    const allRecipes = await Recipe.paginate({}, { page, limit: 3 });
    return res.json(allRecipes);
  }

  async find(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const recipeRequired = await Recipe.find({ shortID: +id });
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

  async updateRecipe(req: Request, res: Response): Promise<Response> {
    const { name, photoUrl, ingredients, stepByStep, additionalInformation } = req.body;
    const { id } = req.params;
    await Recipe.updateOne({ shortID: Number(id)}, { $set: {
        shortID: id,
        name: name,
        photoUrl: photoUrl,
        ingredients: ingredients,
        stepByStep: stepByStep,
        additionalInformation: additionalInformation
      }
    });
    return res.json({ message: "Save sucess"});
  }

  async deleteRecipe(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const recipeDeleted = await Recipe.findOne({ shortID: Number(id) });
    await Recipe.deleteOne({ shortID: Number(id) });
    return res.json(recipeDeleted);
  }
}

export default RecipeController;