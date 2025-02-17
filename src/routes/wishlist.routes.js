import express from "express";
import { addContent } from "../controller/wishlist.controller.js";
import { addContentValidator } from "../validator/wishlist.validator.js";
import { validator } from "../validator/validate.js";

const router = express.Router();

router.route("/add").post(addContentValidator(), validator, addContent);

export default router;
