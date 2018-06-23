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
      return;
    }
  }
};

export default resolvers;
