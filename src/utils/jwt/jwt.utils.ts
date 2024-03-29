import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongoose';

/**
 * @todo - update token secret
 * @todo - include more options for jwt.sign
 */
export const generateAccessToken = async (
  payload: { _id: ObjectId },
  expiresIn: '1h' | '1m' | '5m' = '1h'
) => {
  try {
    const token = await jwt.sign(payload, process.env.TOKEN_SECRET as string, {
      expiresIn,
    });
    return token;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const verifyToken = async (token: string) => {
  try {
    const isVerified = await jwt.verify(
      token,
      process.env.TOKEN_SECRET as string
    );
    return isVerified;
  } catch (error) {
    throw new Error(`${error} verify token`);
  }
};
