import express from "express";
import { createUrl, getUrl } from "../controllers/urlController.js";
import auth from "../middlewares/auth.js";

const router = new express.Router();

router.use(auth);

router.get("/info/:code", getUrl);

router.post("/create", createUrl);

export default router;