import Drink from "../../../entities/Drink";
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
      const { drinkName } = args;
      try {
        const drink = await Drink.findOne(
          {
            name: drinkName.toLowerCase()
          },
          { relations: ["deskPics"] }
        );
        if (drink) {
          return {
            ok: true,
            error: null,
            deskPics: drink.deskPics
          };
        } else {
          return {
            ok: false,
            error: "Can't find any image with that drink",
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
