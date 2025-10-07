import { validationResult } from "express-validator";
import { ApiError } from "../utils/api-error.js";

/* 
so the basic flow of the validatiors is goes through this middleware 
req---> middleware--->validators check --passed req--> res otherwise error directly through middleware cant event reach the controller

*/
export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedError = [];
  errors.array().map((err) => {
    extractedError.push({ [err.path]: err.msg });
  });
  throw new ApiError(422, "Received data is Not Valid", extractedError);
};
