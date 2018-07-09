import { NextFunction, Request, Response, Router } from "express";

class SlackRouter {
  router: Router;
  constructor() {
    this.router = Router();
    this.init();
  }

  public slackRoute(req: Request, res: Response, next: NextFunction) {
    console.log(req.body);
    res.sendStatus(200);
  }

  private init() {
    this.router.post("/", this.slackRoute);
  }
}

export default new SlackRouter().router;
