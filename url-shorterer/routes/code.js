import express from "express"
import { redirectByCode } from "../controllers/codeController.js";

const router = new express.Router();

router.get("/:code", redirectByCode);

export default router;