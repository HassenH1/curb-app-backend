import { body, check, oneOf } from 'express-validator'

const addCarValidationRules = () => {
  return [
    body('licensePlateNumber')
      .isLength({ min: 5, max: 9 })
      .not()
      .isEmpty()
      .trim()
      .withMessage('Must be unique'),
    body('carModel').not().isEmpty().trim().withMessage('Must be unique'),
    body('default').not().isEmpty().isBoolean(),
  ]
}

const getACarValidationRules = () => {
  return [body('userId').not().isEmpty().trim().withMessage('Cannot be empty')]
}

const updateCarValidationRules = () => {
  return [
    body('_id').not().isEmpty().trim().withMessage('Cannot be empty').bail(),
    body('licensePlateNumber').optional().isLength({ min: 5, max: 9 }).trim(),
    body('carModel').optional().trim(),
    body('default').optional().isBoolean(),
  ]
}

export {
  getACarValidationRules,
  addCarValidationRules,
  updateCarValidationRules,
}
