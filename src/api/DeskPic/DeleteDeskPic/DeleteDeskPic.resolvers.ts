import DeskPic from "../../../entities/DeskPic";
import {
  DeleteDeskPicMutationArgs,
  DeleteDeskPicResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/types";

const MASTER_PASSWORD = process.env.MASTER_PASSWORD || "";

const resolvers: Resolvers = {
  Mutation: {
    DeleteDeskPic: async (
      _,
      args: DeleteDeskPicMutationArgs
    ): Promise<DeleteDeskPicResponse> => {
      const { picId, masterPassword } = args;
      try {
        const deskPic = await DeskPic.findOne(picId);
        if (deskPic) {
          if (masterPassword === MASTER_PASSWORD) {
            deskPic.remove();
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
