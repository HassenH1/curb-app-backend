import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../services/jwt/jwt.service";

export const authenticateJWT = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).send({ message: "Unauthorized: No token provided" });
  }
  try {
    const verified = await verifyToken(token);
    // console.log(verified, "<---verified?")
    next();
  } catch (error) {
    return res.status(400).send({ message: "Unauthorized: Invalid token" });
  }
};
