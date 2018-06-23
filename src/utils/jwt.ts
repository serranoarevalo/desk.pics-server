import jwt from "jsonwebtoken";
import User from "../entities/User";
import { JWT_SECRET } from "../keys";

export const createJWT = (userId: number): string => {
  const token = jwt.sign(
    {
      id: userId
    },
    JWT_SECRET
  );
  return token;
};

export const decodeJWT = async (token: string): Promise<User | undefined> => {
  try {
    const decoded: any = await jwt.verify(token, JWT_SECRET);
    const user = await User.findOne(decoded.id);
    return user;
  } catch (err) {
    return undefined;
  }
};
