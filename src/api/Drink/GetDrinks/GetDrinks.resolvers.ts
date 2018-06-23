import Drink from "../../../entities/Drink";
import { GetDrinksResponse } from "../../../types/graph";
import { Resolvers } from "../../../types/types";

const resolvers: Resolvers = {
  Query: {
    GetDrinks: async (): Promise<GetDrinksResponse> => {
      try {
        const drinks = await Drink.find({ relations: ["deskPics"] });
        return {
          ok: true,
          error: null,
          drinks
        };
      } catch (error) {
        return {
          ok: false,
          error: error.message,
          drinks: null
        };
      }
    }
  }
};

export default resolvers;
