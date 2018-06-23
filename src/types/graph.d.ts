export const typeDefs = ["type DeskPic {\n  id: Int!\n  userId: Int!\n  user: User!\n  createdAt: String!\n  updatedAt: String!\n}\n\ntype ConnectUserResponse {\n  ok: Boolean!\n  error: String\n  user: User\n  token: String\n}\n\ntype Mutation {\n  ConnectUser(email: String, firstName: String!, lastName: String!, fbUserId: String!): ConnectUserResponse!\n  EditUser(bio: String, location: String): EditUserResponse!\n}\n\ntype EditUserResponse {\n  ok: Boolean!\n  error: String\n  user: User\n}\n\ntype GetUserResponse {\n  ok: Boolean!\n  error: String\n  user: User\n}\n\ntype Query {\n  GetUser: GetUserResponse!\n}\n\ntype User {\n  email: String\n  firstName: String!\n  lastName: String!\n  bio: String\n  location: String\n  profilePhoto: String!\n  fullName: String!\n  fbUserId: String!\n  deskPics: [DeskPic]\n  createdAt: String!\n  updatedAt: String!\n}\n"];
/* tslint:disable */

export interface Query {
  GetUser: GetUserResponse;
}

export interface GetUserResponse {
  ok: boolean;
  error: string | null;
  user: User | null;
}

export interface User {
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

export interface DeskPic {
  id: number;
  userId: number;
  user: User;
  createdAt: string;
  updatedAt: string;
}

export interface Mutation {
  ConnectUser: ConnectUserResponse;
  EditUser: EditUserResponse;
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
