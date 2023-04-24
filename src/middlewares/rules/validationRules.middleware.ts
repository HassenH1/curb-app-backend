import { body, checkExact } from 'express-validator';

const exactBodyCheck = (body: Array<any>) => {
  return checkExact(body, {
    message: 'Too many fields specified',
  });
};

const signupValidationRules = () => {
  return [
    exactBodyCheck([
      body('username').not().isEmpty().trim().withMessage('Must be unique'),
      body('email')
        .isEmail()
        .normalizeEmail()
        .not()
        .isEmpty()
        .trim()
        .withMessage('Must be unique'),
      body('password').isLength({ min: 5 }).not().isEmpty().trim(),
      body('firstName').not().isEmpty().trim(),
      body('lastName').not().isEmpty().trim(),
      body('phoneNumber').not().isEmpty().trim(),
    ]),
  ];
};

const loginValidationRules = () => {
  return [
    exactBodyCheck([
      body('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('Invalid')
        .not()
        .isEmpty()
        .trim()
        .withMessage('Cannot be empty'),
      body('password')
        .isLength({ min: 5 })
        .withMessage('min length of 5 characters')
        .not()
        .isEmpty()
        .trim()
        .withMessage('Cannot be empty'),
    ]),
  ];
};

export { signupValidationRules, loginValidationRules };
