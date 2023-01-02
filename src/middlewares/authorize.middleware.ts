import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../services/jwt/jwt.service";

export const authenticateJWT = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authorizationHeader = req.headers["authorization"];
    const token = parseBearer(authorizationHeader as string);
    if (!token || token === undefined) return res.status(401).send({ message: "Unauthorized: No token provided" });

    const verified = await verifyToken(token);
    if(!verified) return res.status(400).send({ message: "not verified" })
    next();
  } catch (error) {
    return res.status(400).send({ message: "Unauthorized: Invalid token" });
  }
};

const parseBearer = (bearer: string) => {
  const [_, token] = bearer.trim().split(" ");
  return token;
};