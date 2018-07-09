import axios from "axios";
import { NextFunction, Request, Response, Router } from "express";

class SlackRouter {
  router: Router;
  constructor() {
    this.router = Router();
    this.init();
  }

  public slackRoute = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const {
      event: { text = null, file: { url_private = null } = {}, user }
    } = req.body;
    if (text && url_private && user) {
      const regex = /\[.*?\|.\D+\]/;
      if (regex.test(text)) {
        const parsedText: string = text.match(regex)[0];
        const {
          data,
          data: { ok }
        } = await axios(
          `https://slack.com/api/users.profile.get?token=${
            process.env.SLACK_TOKEN
          }&user=${user}`
        );
        if (ok) {
          const {
            profile: { first_name, last_name, email, image_original }
          } = data;
          const cleanedText = parsedText.substring(1, parsedText.length - 1);
          const splittedTex = cleanedText.split("|");
          const drink = splittedTex[0];
          const location = splittedTex[1];
          console.log(
            first_name,
            last_name,
            email,
            image_original,
            drink,
            location
          );
          res.send(200);
        }
      }
    }
    res.sendStatus(401);
  };

  private init() {
    this.router.post("/", this.slackRoute);
  }
}

export default new SlackRouter().router;
