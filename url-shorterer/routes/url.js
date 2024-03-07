import express from "express"

const router = new express.Router();

router.get("/", (req, res) => {
    res.end("url router")
});

export default router;