import IFTTTMaker from "node-ifttt-maker";
import DeskPic from "../../../entities/DeskPic";
import Drink from "../../../entities/Drink";
import {
  UploadDeskPicMutationArgs,
  UploadDeskPicResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/types";
import { authMiddleware, makeMiddleware } from "../../../utils/middlewares";

const resolvers: Resolvers = {
  Mutation: {
    UploadDeskPic: makeMiddleware(
      authMiddleware,
      async (
        _,
        args: UploadDeskPicMutationArgs,
        { req }
      ): Promise<UploadDeskPicResponse> => {
        const { drinkName, photoUrl, locationName } = args;
        let drink = await Drink.findOne({ name: drinkName.toLowerCase() });
        if (!drink) {
          drink = await Drink.create({ name: drinkName.toLowerCase() }).save();
        }
        try {
          const deskPic = await DeskPic.create({
            user: req.user,
            drink,
            photoUrl,
            locationName,
            approved: true
          }).save();
          const ifttt = new IFTTTMaker(process.env.MAKER_KEY || "");
          ifttt.request("new_desk");
          if (deskPic) {
            return {
              ok: true,
              error: null,
              deskPic
            };
          } else {
            return {
              ok: true,
              error: "Can't upload photo",
              deskPic: null
            };
          }
        } catch (error) {
          return {
            ok: false,
            deskPic: null,
            error: error.message
          };
        }
      }
    )
  }
};
export default resolvers;
