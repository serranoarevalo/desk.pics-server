import DeskPic from "../../../entities/DeskPic";
import {
  DeleteDeskPicMutationArgs,
  DeleteDeskPicResponse,
  EditDeskPicMutationArgs,
  EditDeskPicResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/types";

const MASTER_PASSWORD = process.env.MASTER_PASSWORD || "";

const resolvers: Resolvers = {
  Mutation: {
    EditDeskPic: async (
      _,
      args: EditDeskPicMutationArgs
    ): Promise<EditDeskPicResponse> => {
      const { picId, action, masterPassword } = args;
      try {
        const deskPic = await DeskPic.findOne(picId);
        if (deskPic) {
          if (masterPassword === MASTER_PASSWORD) {
            if (action === "APPROVE") {
              deskPic.approved = true;
              deskPic.save();
            } else if (action === "DELETE") {
              deskPic.remove();
            } else if (action === "DISAPPROVE") {
              deskPic.approved = false;
              deskPic.save();
            } else if (action === "FEATURE") {
              const featuredPic = await DeskPic.findOne({ isFeatured: true });
              if (featuredPic) {
                featuredPic.isFeatured = false;
                featuredPic.save();
              }
              deskPic.isFeatured = true;
              deskPic.save();
            }
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
