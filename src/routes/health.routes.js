import express from "express";
import { healthController } from "../controller/health.controller.js";

const router = express.Router();

router.route("/").get(healthController);

export default router;
