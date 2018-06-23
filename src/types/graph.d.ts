export const typeDefs = [
  "type DeskPic {\n  id: Int!\n  userId: Int!\n  user: User!\n  createdAt: String!\n  updatedAt: String!\n}\n",
  "type ConnectUserResponse {\n  ok: Boolean!\n  error: String\n  user: User\n  token: String\n}\n\ntype Mutation {\n  ConnectUser(\n    email: String\n    firstName: String\n    lastName: String\n    fbUserId: String!\n  ): ConnectUserResponse!\n}\n",
  "type EditUserResponse {\n  ok: Boolean!\n  error: String\n  user: User\n}\n\ntype Mutation {\n  EditUser(bio: String, location: String): EditUserResponse!\n}\n",
  "type GetUserResponse {\n  ok: Boolean!\n  error: String\n  user: User\n}\n\ntype Query {\n  GetUser: GetUserResponse!\n}\n",
  "type User {\n  email: String!\n  firstName: String!\n  lastName: String!\n  bio: String!\n  location: String!\n  profilePhoto: String!\n  fullName: String!\n  fbUserId: String!\n  deskPics: [DeskPic]\n  createdAt: String!\n  updatedAt: String!\n}\n"
];
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
  email: string;
  firstName: string;
  lastName: string;
  bio: string;
  location: string;
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
  EditUser: EditUserResponse;
}

export interface EditUserMutationArgs {
  bio: string | null;
  location: string | null;
}

export interface EditUserResponse {
  ok: boolean;
  error: string | null;
  user: User | null;
}

export interface ConnectUserResponse {
  ok: boolean;
  error: string | null;
  user: User | null;
  token: string | null;
}
