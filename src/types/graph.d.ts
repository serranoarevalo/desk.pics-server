export const typeDefs = ["type FilterDeskPicsResponse {\n  ok: Boolean\n  error: String\n  deskPics: [DeskPic]\n}\n\ntype Query {\n  FilterDeskPics(drinkName: String!, page: Int!): FilterDeskPicsResponse!\n  GetDeskPic(deskPicId: Int!): GetDeskPicResponse!\n  GetDeskPics(page: Int!): GetDeskPicsResponse!\n  GetDrinks: GetDrinksResponse!\n  GetUser(fbUserId: String!): GetUserResponse!\n}\n\ntype GetDeskPicResponse {\n  ok: Boolean!\n  error: String\n  deskPic: DeskPic\n}\n\ntype GetDeskPicsResponse {\n  ok: Boolean!\n  error: String\n  deskPics: [DeskPic]\n}\n\ntype Coords {\n  lat: Float\n  lng: Float\n}\n\ntype DeskPic {\n  id: Int!\n  userId: Int!\n  user: User!\n  drinkId: Int!\n  drink: Drink!\n  photoUrl: String!\n  locationCoords: Coords\n  locationName: String\n  createdAt: String!\n  updatedAt: String!\n}\n\ntype UploadDeskPicResponse {\n  ok: Boolean!\n  error: String\n  deskPic: DeskPic\n}\n\ntype Mutation {\n  UploadDeskPic(drinkName: String!, photoUrl: String!, locationName: String!, locationLat: Float, locationLng: Float): UploadDeskPicResponse!\n  ConnectUser(email: String, firstName: String!, lastName: String!, fbUserId: String!): ConnectUserResponse!\n  EditUser(bio: String, location: String): EditUserResponse!\n}\n\ntype GetDrinksResponse {\n  ok: Boolean!\n  error: String\n  drinks: [Drink]\n}\n\ntype Drink {\n  id: Int!\n  deskPics: [DeskPic]\n  name: String!\n  countDeskPics: Int!\n  createdAt: String!\n  updatedAt: String!\n}\n\ntype ConnectUserResponse {\n  ok: Boolean!\n  error: String\n  user: User\n  token: String\n}\n\ntype EditUserResponse {\n  ok: Boolean!\n  error: String\n  user: User\n}\n\ntype GetUserResponse {\n  ok: Boolean!\n  error: String\n  user: User\n}\n\ntype User {\n  id: Int!\n  email: String\n  firstName: String!\n  lastName: String!\n  bio: String\n  location: String\n  profilePhoto: String!\n  fullName: String!\n  fbUserId: String!\n  deskPics: [DeskPic]\n  createdAt: String!\n  updatedAt: String!\n}\n"];
/* tslint:disable */

export interface Query {
  FilterDeskPics: FilterDeskPicsResponse;
  GetDeskPic: GetDeskPicResponse;
  GetDeskPics: GetDeskPicsResponse;
  GetDrinks: GetDrinksResponse;
  GetUser: GetUserResponse;
}

export interface FilterDeskPicsQueryArgs {
  drinkName: string;
  page: number;
}

export interface GetDeskPicQueryArgs {
  deskPicId: number;
}

export interface GetDeskPicsQueryArgs {
  page: number;
}

export interface GetUserQueryArgs {
  fbUserId: string;
}

export interface FilterDeskPicsResponse {
  ok: boolean | null;
  error: string | null;
  deskPics: Array<DeskPic> | null;
}

export interface DeskPic {
  id: number;
  userId: number;
  user: User;
  drinkId: number;
  drink: Drink;
  photoUrl: string;
  locationCoords: Coords | null;
  locationName: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: number;
  email: string | null;
  firstName: string;
  lastName: string;
  bio: string | null;
  location: string | null;
  profilePhoto: string;
  fullName: string;
  fbUserId: string;
  deskPics: Array<DeskPic> | null;
  createdAt: string;
  updatedAt: string;
}

export interface Drink {
  id: number;
  deskPics: Array<DeskPic> | null;
  name: string;
  countDeskPics: number;
  createdAt: string;
  updatedAt: string;
}

export interface Coords {
  lat: number | null;
  lng: number | null;
}

export interface GetDeskPicResponse {
  ok: boolean;
  error: string | null;
  deskPic: DeskPic | null;
}

export interface GetDeskPicsResponse {
  ok: boolean;
  error: string | null;
  deskPics: Array<DeskPic> | null;
}

export interface GetDrinksResponse {
  ok: boolean;
  error: string | null;
  drinks: Array<Drink> | null;
}

export interface GetUserResponse {
  ok: boolean;
  error: string | null;
  user: User | null;
}

export interface Mutation {
  UploadDeskPic: UploadDeskPicResponse;
  ConnectUser: ConnectUserResponse;
  EditUser: EditUserResponse;
}

export interface UploadDeskPicMutationArgs {
  drinkName: string;
  photoUrl: string;
  locationName: string;
  locationLat: number | null;
  locationLng: number | null;
}

export interface ConnectUserMutationArgs {
  email: string | null;
  firstName: string;
  lastName: string;
  fbUserId: string;
}

export interface EditUserMutationArgs {
  bio: string | null;
  location: string | null;
}

export interface UploadDeskPicResponse {
  ok: boolean;
  error: string | null;
  deskPic: DeskPic | null;
}

export interface ConnectUserResponse {
  ok: boolean;
  error: string | null;
  user: User | null;
  token: string | null;
}

export interface EditUserResponse {
  ok: boolean;
  error: string | null;
  user: User | null;
}
