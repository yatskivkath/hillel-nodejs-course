import express from "express";
import { createUrl, getUrl, getUrlsByUser } from "../controllers/urlController.js";
import auth from "../middlewares/authMiddleware.js";

const router = new express.Router();

router.use(auth);

router.get("/", getUrlsByUser);

router.get("/info/:code", getUrl);

router.post("/create", createUrl);

export default router;