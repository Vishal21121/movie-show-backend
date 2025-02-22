import {
  loginUser,
  refreshAccessToken,
  registerUser,
} from "../controller/user.controller.js";
import express from "express";
import {
  userLoginValidator,
  userRegisterValidator,
} from "../validator/user.validator.js";
import { validator } from "../validator/validate.js";

const router = express.Router();

router.route("/create").post(userRegisterValidator(), validator, registerUser);
router.route("/login").post(userLoginValidator(), validator, loginUser);
router.route("/refresh-token").get(refreshAccessToken);

export default router;
