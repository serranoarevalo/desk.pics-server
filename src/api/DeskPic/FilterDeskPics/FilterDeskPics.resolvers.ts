import { Like } from "typeorm";
import DeskPic from "../../../entities/DeskPic";
import {
  FilterDeskPicsQueryArgs,
  FilterDeskPicsResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/types";

const resolvers: Resolvers = {
  Query: {
    FilterDeskPics: async (
      _,
      args: FilterDeskPicsQueryArgs
    ): Promise<FilterDeskPicsResponse> => {
      const { drinkName, page } = args;
      try {
        const deskPics = await DeskPic.find({
          take: 20,
          skip: 10 * page,
          join: {
            alias: "pic",
            leftJoinAndSelect: {
              drink: "pic.drink"
            }
          },
          where: {
            drink: {
              name: Like(drinkName)
            }
          }
        });
        console.log(deskPics);
        return {
          ok: true,
          error: null,
          deskPics
        };
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
