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
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = express.Router();

router
  .route("/add")
  .post(verifyJWT, addContentValidator(), validator, addContent);
router
  .route("/get")
  .get(verifyJWT, getContentValidator(), validator, getContentPaginated);
router.route("/delete").delete(verifyJWT, deleteContent);

export default router;
