import express from "express";
import { createUrl, readUrl } from "../controllers/url.js";
import auth from "../middlewares/auth.js";

const router = new express.Router();

router.use(auth);

router.get("/info/:code", readUrl);

router.post("/create", createUrl);

export default router;