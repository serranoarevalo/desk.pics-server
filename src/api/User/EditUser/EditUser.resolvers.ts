import User from "../../../entities/User";
import { EditUserMutationArgs, EditUserResponse } from "../../../types/graph";
import { Resolvers } from "../../../types/types";
import { authMiddleware, makeMiddleware } from "../../../utils/middlewares";

const resolvers: Resolvers = {
  Mutation: {
    EditUser: makeMiddleware(
      authMiddleware,
      async (
        _,
        args: EditUserMutationArgs,
        { req }
      ): Promise<EditUserResponse> => {
        if (req.user) {
          try {
            await User.update({ id: req.user.id }, { ...args });
            const user = await User.findOne(req.user.id);
            if (user) {
              return {
                ok: true,
                error: null,
                user
              };
            }
          } catch (error) {
            return {
              ok: false,
              error: error.message,
              user: null
            };
          }
        }
        return {
          ok: false,
          error: "Can't update",
          user: null
        };
      }
    )
  }
};

export default resolvers;
