import User from "../../../entities/User";
import { MakeAdminMutationArgs, MakeAdminResponse } from "../../../types/graph";
import { Resolvers } from "../../../types/types";

const MASTER_PASSWORD = process.env.MASTER_PASSWORD || "";

const resolvers: Resolvers = {
  Mutation: {
    MakeAdmin: async (
      _,
      args: MakeAdminMutationArgs
    ): Promise<MakeAdminResponse> => {
      const { email, masterKey } = args;
      if (masterKey === MASTER_PASSWORD) {
        const user = await User.findOne({ email });
        if (user) {
          user.isAdmin = true;
          user.save();
          return {
            ok: true,
            error: null
          };
        }
        return {
          ok: false,
          error: "User not found"
        };
      } else {
        return {
          ok: false,
          error: "Wrong masterKey"
        };
      }
    }
  }
};

export default resolvers;
