import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt/jwt.utils';

export const authenticateJWT = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers['authorization']?.trim()?.split(' ')[1];
    if (!token || token === undefined)
      return res
        .status(401)
        .send({ message: 'Unauthorized: No token provided' });
    const verified = await verifyToken(token);
    if (!verified)
      return res.status(400).send({ message: 'Unauthorized: Cannot verified' });
    next();
  } catch (error) {
    return res.status(403).send({ message: 'Unauthorized: Invalid token' });
  }
};
