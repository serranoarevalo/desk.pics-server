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
          take: 20,
          skip: 20 * page,
          relations: ["drink", "user"],
          order: {
            id: "DESC"
          },
          where: {
            approved: true
          }
        });
        const totalDeskPics = await DeskPic.count({ approved: true });
        return {
          ok: true,
          error: null,
          deskPics,
          currentPage: page,
          pages: Math.floor(totalDeskPics / 20)
        };
      } catch (error) {
        return {
          error: error.message,
          ok: false,
          deskPics: null,
          currentPage: 0,
          pages: 0
        };
      }
    }
  }
};
export default resolvers;
