import { Request, Response } from "express";

const errorHandler = (err: any, req: Request, res: Response) => {
  console.log("ERROR HANDLER HIT");
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
};

export default errorHandler;
