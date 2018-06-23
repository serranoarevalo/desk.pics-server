import { IExtendedContext, Resolver } from "../types/types";

export const authMiddleware = async (
  resolver: Resolver,
  parent: any,
  args: any,
  context: IExtendedContext,
  info: any
) => {
  if (!context.req.user) {
    throw new Error("No JWT token provided. I refuse to proceed");
  }
  const resolved = await resolver(parent, args, context, info);
  return resolved;
};

export const makeMiddleware = (
  middlewareFunc: any,
  resolverFunc: Resolver
): Resolver => (parent: any, args: any, context: IExtendedContext, info: any) =>
  middlewareFunc(resolverFunc, parent, args, context, info);
