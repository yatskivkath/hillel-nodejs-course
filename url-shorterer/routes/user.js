import express from "express"

const router = new express.Router();

router.get("/", (req, res) => {
    res.end("user router")
});

export default router;