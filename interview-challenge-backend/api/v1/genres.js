import express from "express";
import { db } from "../../services/mysql.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const [genresResult] = await db.query("SELECT * FROM genres");
        res.status(200).json(genresResult);
      } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

export default router;