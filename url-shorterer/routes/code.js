import express from "express"
import { redirectByCode } from "../controllers/codeController.js";
import { rateLimitByCode, rateLimitByUser } from "../middlewares/rateLimitMiddleware.js";

const router = new express.Router();

router.get("/:code", rateLimitByCode, rateLimitByUser, redirectByCode);

export default router;