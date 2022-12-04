import jwt from "jsonwebtoken";
import { IGenerateToken } from "./types";

/**
 * @todo - update token secret
 * @todo - include more options for jwt.sign
 */
export const generateAccessToken = (payload: IGenerateToken) => {
  try {
    const token = jwt.sign(payload, process.env.TOKEN_SECRET as string, {
      expiresIn: "1800s",
    });
    return token;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const verifyToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET as string);
    return decoded;
  } catch (error: any) {
    throw new Error(error);
  }
};
