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
    body('_id').not().isEmpty().trim().withMessage('Cannot be empty'),
    oneOf([
      check('licensePlateNumber')
        .exists()
        .isLength({ min: 5, max: 9 })
        .trim()
        .withMessage('email is required'),
      check('carModel').exists().trim().withMessage('email is required'),
      check('default').exists().isBoolean().withMessage('email is required'),
    ]),
  ]
}

export {
  getACarValidationRules,
  addCarValidationRules,
  updateCarValidationRules,
}
