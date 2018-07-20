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
        const deskPic = await DeskPic.findOne(
          { id: deskPicId, approved: true },
          {
            relations: ["drink", "user"]
          }
        );
        if (deskPic) {
          deskPic.views = deskPic.views + 1;
          deskPic.save();
          return {
            ok: true,
            error: null,
            deskPic
          };
        } else {
          return {
            ok: false,
            error: "Desk pic not found.",
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
