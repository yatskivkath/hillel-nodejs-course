import express from "express"

const router = new express.Router();

router.get("/:code", (req, res) => {s
    res.status(201).end("code router");
});

export default router;