import { Request } from "express";
import User from "../entities/User";

export interface ICoords {
  lat: number | null;
  lng: number | null;
}

export interface IExtendedRequest extends Request {
  user?: User;
}

export interface IExtendedContext {
  [key: string]: any;
  req: IExtendedRequest;
}

export type Resolver = (
  parent: any,
  args: any,
  context: IExtendedContext,
  info: any
) => any;

export interface Resolvers {
  [key: string]: {
    [key: string]: Resolver;
  };
}
