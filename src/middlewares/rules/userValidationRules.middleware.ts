import { body, checkExact } from 'express-validator';

const exactBodyCheck = (body: Array<any>) => {
  return checkExact(body, {
    message: 'Too many fields specified',
  });
};

const updateUserValidationRules = () => {
  return [
    exactBodyCheck([
      body('username')
        .optional()
        .not()
        .isEmpty()
        .trim()
        .withMessage('Must be unique'),
      body('email')
        .optional()
        .isEmail()
        .normalizeEmail()
        .not()
        .isEmpty()
        .trim()
        .withMessage('Must be unique'),
      body('password').optional().isLength({ min: 5 }).not().isEmpty().trim(),
      body('firstName').optional().not().isEmpty().trim(),
      body('lastName').optional().not().isEmpty().trim(),
      body('phoneNumber').optional().not().isEmpty().trim(),
      body('emailVerified').optional().not().isEmpty().isBoolean(),
    ]),
  ];
};

export { updateUserValidationRules };
