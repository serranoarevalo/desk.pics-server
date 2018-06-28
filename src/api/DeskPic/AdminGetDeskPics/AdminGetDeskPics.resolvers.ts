import DeskPic from "../../../entities/DeskPic";
import {
  AdminGetDeskPicsQueryArgs,
  AdminGetDeskPicsResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/types";

const MASTER_PASSWORD = process.env.MASTER_PASSWORD || "";

const resolvers: Resolvers = {
  Query: {
    AdminGetDeskPics: async (
      _,
      args: AdminGetDeskPicsQueryArgs
    ): Promise<AdminGetDeskPicsResponse> => {
      const { approved, masterPassword } = args;
      try {
        const deskPics = await DeskPic.find({ approved });
        if (deskPics) {
          if (masterPassword === MASTER_PASSWORD) {
            return {
              ok: true,
              error: null,
              deskPics
            };
          } else {
            return {
              ok: false,
              error: "Not admin",
              deskPics: null
            };
          }
        } else {
          return {
            ok: false,
            error: "Can't find photos",
            deskPics: null
          };
        }
      } catch (error) {
        return {
          ok: false,
          error: error.message,
          deskPics: null
        };
      }
    }
  }
};

export default resolvers;
