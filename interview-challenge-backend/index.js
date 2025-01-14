import "dotenv/config.js";

import express from 'express';
import logger from 'morgan';
import cors from 'cors';

import { connectToMySQL } from "./services/mysql.js";

import movieRouter from "./api/v1/movies.js";
import genreRouter from "./api/v1/genres.js";

const app = express();

connectToMySQL();

// Middleware
app.use(logger("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the API' });
});

// Other routes
app.use("/api/v1/movies", movieRouter);
app.use("/api/v1/genres", genreRouter);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});