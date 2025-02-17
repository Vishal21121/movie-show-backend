import { validationResult } from "express-validator";
import { ApiError } from "../utils/ApiError.js";

const validator = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push(err.msg));
  // 422: Unprocessable Entity
  throw new ApiError(422, "Received data is not valid", extractedErrors);
};

export { validator };
