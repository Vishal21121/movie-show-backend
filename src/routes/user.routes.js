import { registerUser } from "../controller/user.controller.js";
import express from "express";

const router = express.Router();

router.route("/create").post(registerUser);

export default router;
