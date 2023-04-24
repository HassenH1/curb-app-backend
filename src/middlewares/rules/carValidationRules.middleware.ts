import { body, checkExact } from 'express-validator';

const exactBodyCheck = (body: Array<any>) => {
  return checkExact(body, {
    message: 'Too many fields specified',
  });
};

const addCarValidationRules = () => {
  return [
    exactBodyCheck([
      body('licensePlateNumber')
        .isLength({ min: 5, max: 9 })
        .not()
        .isEmpty()
        .trim()
        .withMessage('Must be unique'),
      body('carModel').not().isEmpty().trim().withMessage('Must be unique'),
      body('default').not().isEmpty().isBoolean(),
    ]),
  ];
};

const getACarValidationRules = () => {
  return exactBodyCheck([
    body('userId').not().isEmpty().trim().withMessage('Cannot be empty'),
  ]);
};

const updateCarValidationRules = () => {
  return exactBodyCheck([
    body('_id').not().isEmpty().trim().withMessage('Cannot be empty').bail(),
    body('licensePlateNumber').optional().isLength({ min: 5, max: 9 }).trim(),
    body('carModel').optional().trim(),
    body('default').optional().isBoolean(),
  ]);
};

export {
  getACarValidationRules,
  addCarValidationRules,
  updateCarValidationRules,
};
