import jwt from "jsonwebtoken";
import User from "../entities/User";

export const createJWT = (userId: number): string => {
  const token = jwt.sign(
    {
      id: userId
    },
    process.env.JWT_SECRET || ""
  );
  return token;
};

export const decodeJWT = async (token: string): Promise<User | undefined> => {
  try {
    const decoded: any = await jwt.verify(token, process.env.JWT_SECRET || "");
    const user = await User.findOne(decoded.id);
    return user;
  } catch (err) {
    return undefined;
  }
};
