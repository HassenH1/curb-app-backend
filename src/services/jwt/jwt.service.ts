import jwt from 'jsonwebtoken'
import { IGenerateToken } from './types'

/**
 * @todo - update token secret
 * @todo - include more options for jwt.sign
 */
export const generateAccessToken = async (payload: IGenerateToken) => {
  try {
    const token = jwt.sign(payload, process.env.TOKEN_SECRET as string, {
      expiresIn: 2 * 60 * 60 * 1000,
    })
    return token
  } catch (error: any) {
    throw new Error(error)
  }
}

export const verifyToken = async (token: string) => {
  const isVerified = await jwt.verify(token, process.env.TOKEN_SECRET as string)
  return isVerified
}

