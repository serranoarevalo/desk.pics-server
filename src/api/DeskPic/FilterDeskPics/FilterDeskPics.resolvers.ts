import { getConnection } from "typeorm";
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
      const { page, drinkName } = args;
      try {
        const deskPics = await getConnection()
          .getRepository(DeskPic)
          .createQueryBuilder("deskPic")
          .innerJoinAndSelect("deskPic.user", "user")
          .innerJoinAndSelect(
            "deskPic.drink",
            "drink",
            "drink.name = :drinkName",
            {
              drinkName
            }
          )
          .where("deskPic.approved = true")
          .skip(10 * page)
          .take(50)
          .getMany();

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
