import { Request, Response, NextFunction } from "express";

export default (req: Request, res: Response, next: NextFunction) => {
  const defaultKeys: string[] = [
    "name", 
    "photoUrl", 
    "ingredients", 
    "stepByStep", 
    "additionalInformation"
  ];

  for(let key of defaultKeys) {
    if(req.body[key].trim() === undefined || "") {
      return res.status(400).json({ message: "Campos inválidos" })
    }
  }

  return next();
};