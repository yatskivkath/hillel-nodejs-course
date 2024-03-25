import express from "express"
import { createUser, getAllUsers } from "../controllers/userController.js"
import auth from "../middlewares/authMiddleware.js";
const router = new express.Router();

router.post("/create", createUser);

router.use(auth);

router.get("/", getAllUsers);

export default router;