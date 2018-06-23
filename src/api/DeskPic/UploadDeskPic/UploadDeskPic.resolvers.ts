import DeskPic from "../../../entities/DeskPic";
import Drink from "../../../entities/Drink";
import {
  UploadDeskPicMutationArgs,
  UploadDeskPicResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/types";
import { authMiddleware, makeMiddleware } from "../../../utils/middlewares";

const resolvers: Resolvers = {
  Query: {
    UploadDeskPic: makeMiddleware(
      authMiddleware,
      async (
        _,
        args: UploadDeskPicMutationArgs,
        { req }
      ): Promise<UploadDeskPicResponse> => {
        const {
          drinkName,
          photoUrl,
          locationName,
          locationLat,
          locationLng
        } = args;
        let drink = await Drink.findOne({ name: drinkName.toLowerCase() });
        if (!drink) {
          drink = await Drink.create({ name: drinkName }).save();
        }
        try {
          const deskPic = await DeskPic.create({
            user: req.user,
            drink,
            photoUrl,
            locationName,
            locationCoords: {
              lat: locationLat,
              lng: locationLng
            }
          }).save();
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
