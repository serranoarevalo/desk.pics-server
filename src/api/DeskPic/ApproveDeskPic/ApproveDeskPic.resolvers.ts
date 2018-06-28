import DeskPic from "../../../entities/DeskPic";
import {
  ApproveDeskPicMutationArgs,
  ApproveDeskPicResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/types";

const MASTER_PASSWORD = process.env.MASTER_PASSWORD || "";

const resolvers: Resolvers = {
  Mutation: {
    ApproveDeskPic: async (
      _,
      args: ApproveDeskPicMutationArgs
    ): Promise<ApproveDeskPicResponse> => {
      const { picId, masterPassword } = args;
      try {
        const deskPic = await DeskPic.findOne(picId);
        if (deskPic) {
          if (masterPassword === MASTER_PASSWORD) {
            deskPic.approved = true;
            deskPic.save();
            return {
              ok: true,
              error: null
            };
          } else {
            return {
              ok: false,
              error: "Not admin"
            };
          }
        } else {
          return {
            ok: false,
            error: "Can't find photo"
          };
        }
      } catch (error) {
        return {
          ok: false,
          error: error.message
        };
      }
    }
  }
};

export default resolvers;
