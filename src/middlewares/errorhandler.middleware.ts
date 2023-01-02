import { NextFunction, Request, Response } from 'express'

const errorHandler = (
  error: Record<string, number>,
  request: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode: number = error.statusCode || 500
  console.error(error.message, error.stack)
  return res.status(statusCode).json({ message: error.message })
}

export default errorHandler
