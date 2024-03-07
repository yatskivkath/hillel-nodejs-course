import express from "express";
import { createUrl, readUrl } from "../controllers/url.js";

const router = new express.Router();

router.get("/info/:code", readUrl);

router.post("/create", createUrl);

export default router;