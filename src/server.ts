import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import routes from "./routes";

dotenv.config();
mongoose.connect(`${process.env.CONNNECTIONSTRING}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("Sucess"))
  .catch(() => console.log("Database Error"))

const server = express();

server.use(express.json());
server.use(function(req: Request, res: Response, next: NextFunction) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

server.use(routes);

server.listen(process.env.PORT || 3333);