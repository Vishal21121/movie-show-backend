import express from "express";
import {
  addContent,
  deleteContent,
  getAllContents,
} from "../controller/wishlist.controller.js";
import { addContentValidator } from "../validator/wishlist.validator.js";
import { validator } from "../validator/validate.js";

const router = express.Router();

router.route("/add").post(addContentValidator(), validator, addContent);
router.route("/get").get(getAllContents);
router.route("/delete").delete(deleteContent);

export default router;
