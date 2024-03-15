import express from "express";
import auth from "../middlewares/auth.js";
import { getUrlsView, getUsersView } from "../controllers/htmlController.js";

const router = new express.Router();

// router.use(auth);

router.get("/users", getUsersView);

router.post("/urls", getUrlsView);

export default router;