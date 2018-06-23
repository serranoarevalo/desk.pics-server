import cors from "cors";
import { NextFunction, Response } from "express";
import { GraphQLServer } from "graphql-yoga";
import logger from "morgan";
import schema from "./schema";
import { IExtendedRequest } from "./types/types";
import { decodeJWT } from "./utils/jwt";

class App {
  public app: GraphQLServer;
  constructor() {
    this.app = new GraphQLServer({ schema });
    this.middlewares();
  }
  private middlewares = (): void => {
    this.app.express.use(cors());
    this.app.express.use(logger("dev"));
    this.app.express.use(this.jwtMiddleware);
  };
  private jwtMiddleware = async (
    req: IExtendedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const token = req.get("X-JWT");
    if (token) {
      const user = await decodeJWT(token);
      if (user) {
        req.user = user;
      }
    }
    next();
  };
}

export default new App().app;
