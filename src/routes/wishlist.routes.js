import express from "express";
import {
  addContent,
  deleteContent,
  getContentPaginated,
} from "../controller/wishlist.controller.js";
import {
  addContentValidator,
  getContentValidator,
} from "../validator/wishlist.validator.js";
import { validator } from "../validator/validate.js";

const router = express.Router();

router.route("/add").post(addContentValidator(), validator, addContent);
router.route("/get").get(getContentValidator(), validator, getContentPaginated);
router.route("/delete").delete(deleteContent);

export default router;
