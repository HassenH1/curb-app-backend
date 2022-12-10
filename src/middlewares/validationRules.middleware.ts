import { body, check, oneOf } from "express-validator";

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

// const updateProfileValidationRules = () => {
//   return [
//     oneOf([
//       check("email").exists().withMessage("email is required"),
//       check("username").exists().withMessage("username is required"),
//       check("password").isNumeric().withMessage("password should be a number"),
//       check("firstName").exists().withMessage("firstName is required"),
//       check("lastName").exists().withMessage("lastName is required"),
//       check("address").exists().withMessage("address is required"),
//       check("phoneNumber").exists().withMessage("phoneNumber is required"),
//       check("dob").exists().withMessage("dob is required"),
//       check("age").exists().withMessage("age is required"),
//     ]),
//   ];
// };

export {
  signupValidationRules,
  loginValidationRules,
  // updateProfileValidationRules,
};
