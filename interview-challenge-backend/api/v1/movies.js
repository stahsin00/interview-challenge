import express from "express";

const router = express.Router();

router.get("/", async (req, res) => {
    res.status(200).send({ message: "TODO" });
});

router.get("/:id", async (req, res) => {
    res.status(200).send({ message: "TODO" });
});

router.post("/", async (req, res) => {
    res.status(200).send({ message: "TODO" });
});

router.put("/:id", async (req, res) => {
    res.status(200).send({ message: "TODO" });
});

router.delete("/:id", async (req, res) => {
    res.status(200).send({ message: "TODO" });
});

export default router;