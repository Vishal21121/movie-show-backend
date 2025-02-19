import { body, query } from "express-validator";

const contentType = ["movie", "tv"];

const addContentValidator = () => {
  return [
    body("contentId")
      .trim()
      .notEmpty()
      .withMessage("Content Id is required")
      .isNumeric()
      .withMessage("Content Id should be numeric"),
    body("title")
      .trim()
      .notEmpty()
      .withMessage("Title is required")
      .isLength({ min: 3, max: 100 })
      .withMessage("Title should be minimum 3 and maximum 100 characters"),
    body("imageUrl")
      .trim()
      .notEmpty()
      .withMessage("Image Url is required")
      .isURL()
      .withMessage("It should be URL"),
    body("contentType")
      .trim()
      .notEmpty()
      .withMessage("Content Type is required")
      .isIn(contentType)
      .withMessage(
        `Content type must be either ${contentType[0]} or ${contentType[1]}`
      ),
    body("userId").trim().notEmpty().withMessage("User id is required"),
  ];
};

const getContentValidator = () => {
  return [
    query("userId").trim().notEmpty().withMessage("userId is required"),
    query("page")
      .trim()
      .notEmpty()
      .withMessage("page is required")
      .isNumeric()
      .withMessage("page should be a number"),
    query("limit")
      .trim()
      .notEmpty()
      .withMessage("limit is required")
      .isNumeric()
      .withMessage("limit should be a number"),
  ];
};

export { addContentValidator, getContentValidator };
