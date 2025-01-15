import express from "express";
import { db } from "../../services/mysql.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;
        
        const whereConditions = [];
        const queryParams = [];
        
        if (req.query.title) {
            whereConditions.push("m.title LIKE ?");
            queryParams.push(`%${req.query.title}%`);
        }
        
        if (req.query.year) {
            whereConditions.push("m.releaseYear = ?");
            queryParams.push(parseInt(req.query.year));
        }
        
        if (req.query.watched != null) {
            whereConditions.push("m.watched = ?");
            queryParams.push(req.query.watched === 'true');
        }
        
        if (req.query.genre) {
            whereConditions.push("g.id = ?");
            queryParams.push(req.query.genre);  // TODO
        }
        
        const whereClause = whereConditions.length 
            ? `WHERE ${whereConditions.join(" AND ")}` 
            : "";

        const [countResult] = await db.query(
            `SELECT COUNT(DISTINCT m.id) as total 
                FROM movies m 
                LEFT JOIN movie_genres mg ON m.id = mg.movie_id 
                LEFT JOIN genres g ON mg.genre_id = g.id 
                ${whereClause}`,
            queryParams
        );
        
        const totalMovies = countResult[0].total;
        const totalPages = Math.ceil(totalMovies / limit);
        
        const [moviesResult] = await db.query(
            `SELECT m.*, 
                    GROUP_CONCAT(g.id) as genreIds,
                    GROUP_CONCAT(g.name) as genreNames 
             FROM movies m 
             LEFT JOIN movie_genres mg ON m.id = mg.movie_id 
             LEFT JOIN genres g ON mg.genre_id = g.id 
             ${whereClause}
             GROUP BY m.id 
             ORDER BY m.createdAt DESC 
             LIMIT ? OFFSET ?`,
            [...queryParams, limit, offset]
        );
        
        const movies = moviesResult.map(movie => ({
            ...movie,
            genres: movie.genreNames 
                ? movie.genreNames.split(',').map((name, index) => ({
                    id: movie.genreIds.split(',')[index],
                    name
                  }))
                : []
        }));
        
        res.status(200).json({
            movies,
            pagination: {
                current: page,
                total: totalPages,
                totalItems: totalMovies
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

router.get("/:id", async (req, res) => {
    try {
        const [movieResult] = await db.query(
            `SELECT m.*, 
                    GROUP_CONCAT(g.id) as genreIds,
                    GROUP_CONCAT(g.name) as genreNames 
             FROM movies m 
             LEFT JOIN movie_genres mg ON m.id = mg.movie_id 
             LEFT JOIN genres g ON mg.genre_id = g.id 
             WHERE m.id = ?
             GROUP BY m.id`,
            [req.params.id]
        );
        
        if (!movieResult.length) {
            return res.status(404).json({ message: "Movie not found." });
        }
        
        const movie = {
            ...movieResult[0],
            genres: movieResult[0].genreNames 
                ? movieResult[0].genreNames.split(',').map((name, index) => ({
                    id: movieResult[0].genreIds.split(',')[index],
                    name
                  }))
                : []
        };
        
        res.status(200).json(movie);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

router.post("/", async (req, res) => {
    const { title, releaseYear, genres } = req.body;
    
    if (!title || !releaseYear) {
        return res.status(400).json({ 
            message: "Title and release year are required" 
        });
    }
    
    if (releaseYear < 1888 || releaseYear > new Date().getFullYear()) {
        return res.status(400).json({ 
            message: "Invalid release year" 
        });
    }
    
    const connection = await db.getConnection();
    
    try {
        await connection.beginTransaction();
        
        const [movieResult] = await connection.query(
            "INSERT INTO movies (title, releaseYear, watched, rating) VALUES (?, ?, ?, ?)",
            [title, releaseYear, false, null]
        );
        
        const movieId = movieResult.insertId;
        
        if (genres && genres.length) {
            const genreValues = genres.map(genreId => [movieId, genreId]);  // TODO: invalid genre id?
            await connection.query(
                "INSERT INTO movie_genres (movie_id, genre_id) VALUES ?",
                [genreValues]
            );
        }
        
        await connection.commit();
        
        const [newMovie] = await connection.query(
            `SELECT m.*, 
                    GROUP_CONCAT(g.id) as genreIds,
                    GROUP_CONCAT(g.name) as genreNames 
             FROM movies m 
             LEFT JOIN movie_genres mg ON m.id = mg.movie_id 
             LEFT JOIN genres g ON mg.genre_id = g.id 
             WHERE m.id = ?
             GROUP BY m.id`,
            [movieId]
        );
        
        const movie = {
            ...newMovie[0],
            genres: newMovie[0].genreNames 
                ? newMovie[0].genreNames.split(',').map((name, index) => ({
                    id: newMovie[0].genreIds.split(',')[index],
                    name
                  }))
                : []
        };
        
        res.status(201).json(movie);
    } catch (err) {
        await connection.rollback();
        console.error(err);
        res.status(500).send("Internal Server Error");
    } finally {
        connection.release();
    }
});

router.put("/:id", async (req, res) => {
    const { title, releaseYear, genres, watched, rating } = req.body;
    const movieId = req.params.id;
    
    if (!title || !releaseYear) {
        return res.status(400).json({ 
            message: "Title and release year are required" 
        });
    }
    
    if (releaseYear < 1888 || releaseYear > new Date().getFullYear()) {
        return res.status(400).json({ 
            message: "Invalid release year" 
        });
    }
    
    if (rating != null && (rating < 1 || rating > 5)) {
        return res.status(400).json({ 
            message: "Rating must be between 1 and 5" 
        });
    }
    
    const connection = await db.getConnection();
    
    try {
        await connection.beginTransaction();
        
        const [existingMovie] = await connection.query(
            "SELECT id FROM movies WHERE id = ?",
            [movieId]
        );
        
        if (!existingMovie.length) {
            await connection.rollback();
            return res.status(404).json({ message: "Movie not found" });
        }
        
        await connection.query(
            `UPDATE movies 
             SET title = ?, releaseYear = ?, watched = ?, rating = ? 
             WHERE id = ?`,
            [title, releaseYear, watched || false, rating || null, movieId]
        );
        
        if (genres != null) {
            await connection.query(
                "DELETE FROM movie_genres WHERE movie_id = ?",
                [movieId]
            );
            
            if (genres.length) {
                const genreValues = genres.map(genreId => [movieId, genreId]);  // TODO: validate genre id?
                await connection.query(
                    "INSERT INTO movie_genres (movie_id, genre_id) VALUES ?",
                    [genreValues]
                );
            }
        }
        
        await connection.commit();
        
        const [updatedMovie] = await connection.query(
            `SELECT m.*, 
                    GROUP_CONCAT(g.id) as genreIds,
                    GROUP_CONCAT(g.name) as genreNames 
             FROM movies m 
             LEFT JOIN movie_genres mg ON m.id = mg.movie_id 
             LEFT JOIN genres g ON mg.genre_id = g.id 
             WHERE m.id = ?
             GROUP BY m.id`,
            [movieId]
        );
        
        const movie = {
            ...updatedMovie[0],
            genres: updatedMovie[0].genreNames 
                ? updatedMovie[0].genreNames.split(',').map((name, index) => ({
                    id: updatedMovie[0].genreIds.split(',')[index],
                    name
                  }))
                : []
        };
        
        res.status(200).json(movie);
    } catch (err) {
        await connection.rollback();
        console.error(err);
        res.status(500).send("Internal Server Error");
    } finally {
        connection.release();
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const [result] = await db.query(
            "DELETE FROM movies WHERE id = ?",
            [req.params.id]
        );
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Movie not found." });
        }
        
        res.status(204).send();
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

export default router;