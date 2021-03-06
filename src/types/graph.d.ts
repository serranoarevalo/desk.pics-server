export const typeDefs = ["type AdminGetDeskPicsResponse {\n  ok: Boolean!\n  error: String\n  deskPics: [DeskPic]\n}\n\ntype Query {\n  AdminGetDeskPics(approved: Boolean!, masterPassword: String!): AdminGetDeskPicsResponse!\n  FilterDeskPics(drinkName: String!, page: Int!): FilterDeskPicsResponse!\n  GetDeskPic(deskPicId: Int!): GetDeskPicResponse!\n  GetDeskPics(page: Int!): GetDeskPicsResponse!\n  GetDrinks: GetDrinksResponse!\n  GetUser(fbUserId: String!): GetUserResponse!\n}\n\ntype EditDeskPicResponse {\n  ok: Boolean!\n  error: String\n}\n\nenum EditDeskPicAction {\n  DELETE\n  FEATURE\n  APPROVE\n  DISAPPROVE\n}\n\ntype Mutation {\n  EditDeskPic(picId: Int!, masterPassword: String!, action: EditDeskPicAction!): EditDeskPicResponse!\n  UploadDeskPic(drinkName: String!, photoUrl: String!, locationName: String!): UploadDeskPicResponse!\n  ConnectUser(email: String, firstName: String!, lastName: String!, fbUserId: String!): ConnectUserResponse!\n  EditUser(bio: String, location: String): EditUserResponse!\n  MakeAdmin(email: String, masterKey: String): MakeAdminResponse!\n}\n\ntype FilterDeskPicsResponse {\n  ok: Boolean\n  error: String\n  deskPics: [DeskPic]\n}\n\ntype GetDeskPicResponse {\n  ok: Boolean!\n  error: String\n  deskPic: DeskPic\n}\n\ntype GetDeskPicsResponse {\n  ok: Boolean!\n  error: String\n  deskPics: [DeskPic]\n  pages: Int!\n  currentPage: Int!\n}\n\ntype Coords {\n  lat: Float\n  lng: Float\n}\n\ntype DeskPic {\n  id: Int!\n  userId: Int!\n  user: User!\n  drinkId: Int!\n  drink: Drink!\n  photoUrl: String!\n  locationCoords: Coords\n  locationName: String\n  bigUrl: String!\n  thumbnailUrl: String!\n  views: Int!\n  approved: Boolean!\n  createdAt: String!\n  updatedAt: String!\n}\n\ntype UploadDeskPicResponse {\n  ok: Boolean!\n  error: String\n  deskPic: DeskPic\n}\n\ntype GetDrinksResponse {\n  ok: Boolean!\n  error: String\n  drinks: [Drink]\n}\n\ntype Drink {\n  id: Int!\n  deskPics: [DeskPic]\n  name: String!\n  countDeskPics: Int!\n  createdAt: String!\n  updatedAt: String!\n}\n\ntype ConnectUserResponse {\n  ok: Boolean!\n  error: String\n  user: User\n  token: String\n}\n\ntype EditUserResponse {\n  ok: Boolean!\n  error: String\n  user: User\n}\n\ntype GetUserResponse {\n  ok: Boolean!\n  error: String\n  user: User\n}\n\ntype MakeAdminResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype User {\n  id: Int!\n  email: String\n  firstName: String!\n  lastName: String!\n  bio: String\n  location: String\n  profilePhoto: String!\n  fullName: String!\n  fbUserId: String!\n  deskPics: [DeskPic]\n  createdAt: String!\n  updatedAt: String!\n  isAdmin: Boolean!\n}\n"];
/* tslint:disable */

export interface Query {
  AdminGetDeskPics: AdminGetDeskPicsResponse;
  FilterDeskPics: FilterDeskPicsResponse;
  GetDeskPic: GetDeskPicResponse;
  GetDeskPics: GetDeskPicsResponse;
  GetDrinks: GetDrinksResponse;
  GetUser: GetUserResponse;
}

export interface AdminGetDeskPicsQueryArgs {
  approved: boolean;
  masterPassword: string;
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

export interface AdminGetDeskPicsResponse {
  ok: boolean;
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
  bigUrl: string;
  thumbnailUrl: string;
  views: number;
  approved: boolean;
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
  isAdmin: boolean;
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

export interface FilterDeskPicsResponse {
  ok: boolean | null;
  error: string | null;
  deskPics: Array<DeskPic> | null;
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
  pages: number;
  currentPage: number;
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
  EditDeskPic: EditDeskPicResponse;
  UploadDeskPic: UploadDeskPicResponse;
  ConnectUser: ConnectUserResponse;
  EditUser: EditUserResponse;
  MakeAdmin: MakeAdminResponse;
}

export interface EditDeskPicMutationArgs {
  picId: number;
  masterPassword: string;
  action: EditDeskPicAction;
}

export interface UploadDeskPicMutationArgs {
  drinkName: string;
  photoUrl: string;
  locationName: string;
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

export interface MakeAdminMutationArgs {
  email: string | null;
  masterKey: string | null;
}

export type EditDeskPicAction = "DELETE" | "FEATURE" | "APPROVE" | "DISAPPROVE";

export interface EditDeskPicResponse {
  ok: boolean;
  error: string | null;
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

export interface MakeAdminResponse {
  ok: boolean;
  error: string | null;
}
