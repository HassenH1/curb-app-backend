import { body } from "express-validator";

const signupValidationRules = () => {
  return [
    body("username").not().isEmpty().trim().withMessage("Must be unique"),
    body("email")
      .isEmail()
      .normalizeEmail()
      .not()
      .isEmpty()
      .trim()
      .withMessage("Must be unique"),
    body("password").isLength({ min: 5 }).not().isEmpty().trim(),
    body("firstName").not().isEmpty().trim(),
    body("lastName").not().isEmpty().trim(),
    body("address").not().isEmpty().trim(),
    body("phoneNumber").not().isEmpty().trim(),
    body("dob").not().isEmpty().trim(),
    body("age").not().isEmpty().isNumeric().trim(),
  ];
};

const loginValidationRules = () => {
  return [
    body("username").not().isEmpty().trim(),
    body("password").isLength({ min: 5 }).not().isEmpty().trim(),
  ];
};

export { signupValidationRules, loginValidationRules };
