import { body } from "express-validator";

const userRegisterValidator = () => {
  return [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Email is invalid"),
    body("username")
      .trim()
      .notEmpty()
      .withMessage("Username is required")
      .isLowercase()
      .withMessage("Username must be lowercase")
      .isLength({ min: 3, max: 20 })
      .withMessage(
        "Username must be at least 3 and maximum 20 characters long"
      ),
    body("password").trim().notEmpty().withMessage("Password is required"),
  ];
};

const userLoginValidator = () => {
  return [
    body("email").isEmail().withMessage("Email is invalid"),
    body("username").optional(),
    body("password").notEmpty().withMessage("Password is required"),
  ];
};

export { userLoginValidator, userRegisterValidator };
