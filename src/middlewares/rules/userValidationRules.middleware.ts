import { body, checkExact } from 'express-validator';

const exactBodyCheck = (body: Array<any>) => {
  return checkExact(body, {
    message: 'Too many fields specified',
  });
};

const updateUserValidationRules = () => {
  return [
    body('_id').not().isEmpty().trim().withMessage('_id is required'),
    exactBodyCheck([
      body('profile.username')
        .optional()
        .not()
        .isEmpty()
        .trim()
        .withMessage('Must be unique'),
      body('profile.email')
        .optional()
        .isEmail()
        .normalizeEmail()
        .not()
        .isEmpty()
        .trim()
        .withMessage('Must be unique'),
      body('profile.password')
        .optional()
        .isLength({ min: 5 })
        .not()
        .isEmpty()
        .trim(),
      body('profile.firstName').optional().not().isEmpty().trim(),
      body('profile.lastName').optional().not().isEmpty().trim(),
      body('profile.phoneNumber').optional().not().isEmpty().trim(),
    ]),
  ];
};

export { updateUserValidationRules };
