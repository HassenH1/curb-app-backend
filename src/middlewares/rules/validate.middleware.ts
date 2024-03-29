import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) return next();

  const extractedErrors: { [key: string]: any }[] = [];
  errors.array().map((err) => {
    return extractedErrors.push({
      ...err,
    });
  });

  return res.status(422).json({
    errors: extractedErrors,
  });
};

export default validate;
