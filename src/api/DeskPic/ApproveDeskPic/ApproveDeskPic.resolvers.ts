import DeskPic from "../../../entities/DeskPic";
import {
  ApproveDeskPicMutationArgs,
  ApproveDeskPicResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/types";
import { authMiddleware, makeMiddleware } from "../../../utils/middlewares";

const resolvers: Resolvers = {
  Mutation: {
    ApproveDeskPic: makeMiddleware(
      authMiddleware,
      async (
        _,
        args: ApproveDeskPicMutationArgs,
        { req }
      ): Promise<ApproveDeskPicResponse> => {
        const { user } = req;
        const { picId } = args;
        try {
          const deskPic = await DeskPic.findOne(picId);
          if (deskPic) {
            if (user && user.isAdmin) {
              deskPic.approved = true;
              deskPic.save();
            } else {
              return {
                ok: false,
                error: "Not admin"
              };
            }
            return {
              ok: true,
              error: null
            };
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
    )
  }
};

export default resolvers;
