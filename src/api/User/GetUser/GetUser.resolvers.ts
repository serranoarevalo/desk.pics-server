import User from "../../../entities/User";
import { GetUserQueryArgs, GetUserResponse } from "../../../types/graph";
import { Resolvers } from "../../../types/types";

const resolvers: Resolvers = {
  Query: {
    GetUser: async (_, args: GetUserQueryArgs): Promise<GetUserResponse> => {
      const { fbUserId } = args;
      const user = await User.findOne({ fbUserId });
      if (user) {
        return {
          ok: true,
          error: null,
          user
        };
      } else {
        return {
          ok: false,
          error: "Can't find user",
          user: null
        };
      }
    }
  }
};

export default resolvers;
