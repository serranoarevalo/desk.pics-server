import axios from "axios";
import { NextFunction, Request, Response, Router } from "express";
import DeskPic from "./entities/DeskPic";
import Drink from "./entities/Drink";
import User from "./entities/User";
import cloudinaryUpload from "./utils/cloudinaryUpload";

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
    if (req.body.challenge) {
      res.send({
        challenge: req.body.challenge
      });
    } else {
      const {
        event: { text = null, files, user }
      } = req.body;
      if (text && files && user) {
        res.sendStatus(200);
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
              profile: { real_name_normalized, email, image_original }
            } = data;
            const cleanedText = parsedText.substring(1, parsedText.length - 1);
            const splittedTex = cleanedText.split("|");
            const drinkName = splittedTex[0];
            const location = splittedTex[1];

            try {
              let dbUser = await User.findOne({ email });
              if (!dbUser) {
                dbUser = await User.create({
                  email,
                  firstName: real_name_normalized || "Nomad",
                  lastName: real_name_normalized || "Coder",
                  profilePhoto: image_original || "null",
                  fbUserId: "SLACK666"
                }).save();
              }
              let drink = await Drink.findOne({
                name: drinkName.toLowerCase()
              });
              if (!drink) {
                drink = await Drink.create({
                  name: drinkName.toLowerCase()
                }).save();
              }
              const photoUrl = await cloudinaryUpload(files[0].url_private);
              if (photoUrl) {
                await DeskPic.create({
                  user: dbUser,
                  photoUrl,
                  locationName: location,
                  approved: true,
                  drink
                }).save();
              }
            } catch (error) {
              console.log(error);
            }
          }
        }
      }
    }
  };

  private init() {
    this.router.post("/", this.slackRoute);
  }
}

export default new SlackRouter().router;
