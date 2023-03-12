import { body } from 'express-validator'

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
  return [body('_id').not().isEmpty().trim().withMessage('Cannot be empty')]
}

export { getACarValidationRules, addCarValidationRules }
