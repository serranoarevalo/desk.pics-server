import User from "../../../entities/User";
import {
  ConnectUserMutationArgs,
  ConnectUserResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/types";
import { createJWT } from "../../../utils/jwt";

const resolvers: Resolvers = {
  Mutation: {
    ConnectUser: async (
      _,
      args: ConnectUserMutationArgs
    ): Promise<ConnectUserResponse> => {
      const { fbUserId } = args;
      const existingUser = await User.findOne({ fbUserId });
      if (existingUser) {
        const token = createJWT(existingUser.id);
        return {
          ok: true,
          error: null,
          user: existingUser,
          token
        };
      } else {
        const profilePhoto = `https://graph.facebook.com/${fbUserId}/picture?type=square`;
        try {
          const newUser = await User.create({ ...args, profilePhoto }).save();
          const token = createJWT(newUser.id);
          return {
            ok: true,
            error: null,
            user: newUser,
            token
          };
        } catch (error) {
          return {
            ok: false,
            error: error.message,
            user: null,
            token: null
          };
        }
      }
    }
  }
};

export default resolvers;
