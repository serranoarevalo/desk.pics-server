import DeskPic from "../../../entities/DeskPic";
import {
  GetDeskPicsQueryArgs,
  GetDeskPicsResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/types";

const resolvers: Resolvers = {
  Query: {
    GetDeskPics: async (
      _,
      args: GetDeskPicsQueryArgs
    ): Promise<GetDeskPicsResponse> => {
      const { page } = args;
      try {
        const deskPics = await DeskPic.find({
          take: 50,
          skip: 10 * page,
          relations: ["drink", "user"],
          order: {
            id: "DESC"
          }
        });
        return {
          ok: true,
          error: null,
          deskPics
        };
      } catch (error) {
        return {
          error: error.message,
          ok: false,
          deskPics: null
        };
      }
    }
  }
};
export default resolvers;
