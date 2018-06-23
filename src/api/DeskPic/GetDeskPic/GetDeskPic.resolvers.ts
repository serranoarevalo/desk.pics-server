import DeskPic from "../../../entities/DeskPic";
import { GetDeskPicQueryArgs, GetDeskPicResponse } from "../../../types/graph";
import { Resolvers } from "../../../types/types";

const resolvers: Resolvers = {
  Query: {
    GetDeskPic: async (
      _,
      args: GetDeskPicQueryArgs
    ): Promise<GetDeskPicResponse> => {
      const { deskPicId } = args;
      try {
        const deskPic = await DeskPic.findOne(deskPicId);
        if (deskPic) {
          return {
            ok: true,
            error: null,
            deskPic
          };
        } else {
          return {
            ok: false,
            error: "Can't find pic",
            deskPic: null
          };
        }
      } catch (error) {
        return {
          ok: false,
          error: error.message,
          deskPic: null
        };
      }
    }
  }
};
export default resolvers;
