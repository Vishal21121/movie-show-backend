import { loginUser, registerUser } from "../controller/user.controller.js";
import express from "express";

const router = express.Router();

router.route("/create").post(registerUser);
router.route("/login").post(loginUser);

export default router;
