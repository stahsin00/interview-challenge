CREATE TABLE genres (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    name VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE movies (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    title VARCHAR(255) NOT NULL,
    releaseYear INT NOT NULL,
    watched BOOLEAN DEFAULT false,
    rating INT CHECK (rating >= 1 AND rating <= 5),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE movie_genres (
    movie_id VARCHAR(36),
    genre_id VARCHAR(36),
    PRIMARY KEY (movie_id, genre_id),
    FOREIGN KEY (movie_id) REFERENCES movies(id) ON DELETE CASCADE,
    FOREIGN KEY (genre_id) REFERENCES genres(id) ON DELETE CASCADE
);

INSERT INTO genres (name) VALUES
    ('Action'),
    ('Comedy'),
    ('Drama'),
    ('Fantasy'),
    ('Horror'),
    ('Mystery'),
    ('Romance'),
    ('Science Fiction'),
    ('Thriller');

INSERT INTO movies (title, releaseYear, watched, rating)
VALUES
  ('The Matrix', 1999, true, 5),
  ('Inception', 2010, true, 5),
  ('The Godfather', 1972, true, 4),
  ('The Shawshank Redemption', 1994, false, null),
  ('Titanic', 1997, false, null),
  ('Avatar', 2009, true, 3),
  ('The Dark Knight', 2008, true, 5),
  ('The Silence of the Lambs', 1991, false, null),
  ('Pulp Fiction', 1994, true, 5),
  ('Toy Story', 1995, false, null),
  ('Jurassic Park', 1993, false, NULL),
  ('Spirited Away', 2001, false, NULL);

INSERT INTO movie_genres (movie_id, genre_id)
VALUES
  (
    (SELECT id FROM movies WHERE title = 'The Matrix'),
    (SELECT id FROM genres WHERE name = 'Action')
  ),
  (
    (SELECT id FROM movies WHERE title = 'The Matrix'),
    (SELECT id FROM genres WHERE name = 'Science Fiction')
  );

INSERT INTO movie_genres (movie_id, genre_id)
VALUES
  (
    (SELECT id FROM movies WHERE title = 'Inception'),
    (SELECT id FROM genres WHERE name = 'Action')
  ),
  (
    (SELECT id FROM movies WHERE title = 'Inception'),
    (SELECT id FROM genres WHERE name = 'Science Fiction')
  ),
  (
    (SELECT id FROM movies WHERE title = 'Inception'),
    (SELECT id FROM genres WHERE name = 'Mystery')
  ),
  (
    (SELECT id FROM movies WHERE title = 'Inception'),
    (SELECT id FROM genres WHERE name = 'Thriller')
  );

INSERT INTO movie_genres (movie_id, genre_id)
VALUES
  (
    (SELECT id FROM movies WHERE title = 'The Godfather'),
    (SELECT id FROM genres WHERE name = 'Drama')
  );

INSERT INTO movie_genres (movie_id, genre_id)
VALUES
  (
    (SELECT id FROM movies WHERE title = 'The Shawshank Redemption'),
    (SELECT id FROM genres WHERE name = 'Drama')
  );

INSERT INTO movie_genres (movie_id, genre_id)
VALUES
  (
    (SELECT id FROM movies WHERE title = 'Titanic'),
    (SELECT id FROM genres WHERE name = 'Romance')
  ),
  (
    (SELECT id FROM movies WHERE title = 'Titanic'),
    (SELECT id FROM genres WHERE name = 'Drama')
  );

INSERT INTO movie_genres (movie_id, genre_id)
VALUES
  (
    (SELECT id FROM movies WHERE title = 'Avatar'),
    (SELECT id FROM genres WHERE name = 'Science Fiction')
  ),
  (
    (SELECT id FROM movies WHERE title = 'Avatar'),
    (SELECT id FROM genres WHERE name = 'Action')
  ),
  (
    (SELECT id FROM movies WHERE title = 'Avatar'),
    (SELECT id FROM genres WHERE name = 'Fantasy')
  );

INSERT INTO movie_genres (movie_id, genre_id)
VALUES
  (
    (SELECT id FROM movies WHERE title = 'The Dark Knight'),
    (SELECT id FROM genres WHERE name = 'Action')
  ),
  (
    (SELECT id FROM movies WHERE title = 'The Dark Knight'),
    (SELECT id FROM genres WHERE name = 'Drama')
  ),
  (
    (SELECT id FROM movies WHERE title = 'The Dark Knight'),
    (SELECT id FROM genres WHERE name = 'Thriller')
  );

INSERT INTO movie_genres (movie_id, genre_id)
VALUES
  (
    (SELECT id FROM movies WHERE title = 'The Silence of the Lambs'),
    (SELECT id FROM genres WHERE name = 'Thriller')
  ),
  (
    (SELECT id FROM movies WHERE title = 'The Silence of the Lambs'),
    (SELECT id FROM genres WHERE name = 'Horror')
  );

INSERT INTO movie_genres (movie_id, genre_id)
VALUES
  (
    (SELECT id FROM movies WHERE title = 'Pulp Fiction'),
    (SELECT id FROM genres WHERE name = 'Action')
  ),
  (
    (SELECT id FROM movies WHERE title = 'Pulp Fiction'),
    (SELECT id FROM genres WHERE name = 'Drama')
  ),
  (
    (SELECT id FROM movies WHERE title = 'Pulp Fiction'),
    (SELECT id FROM genres WHERE name = 'Thriller')
  );

INSERT INTO movie_genres (movie_id, genre_id)
VALUES
  (
    (SELECT id FROM movies WHERE title = 'Toy Story'),
    (SELECT id FROM genres WHERE name = 'Comedy')
  ),
  (
    (SELECT id FROM movies WHERE title = 'Toy Story'),
    (SELECT id FROM genres WHERE name = 'Fantasy')
  );

INSERT INTO movie_genres (movie_id, genre_id)
VALUES
  (
    (SELECT id FROM movies WHERE title = 'Jurassic Park'),
    (SELECT id FROM genres WHERE name = 'Action')
  ),
  (
    (SELECT id FROM movies WHERE title = 'Jurassic Park'),
    (SELECT id FROM genres WHERE name = 'Science Fiction')
  ),
  (
    (SELECT id FROM movies WHERE title = 'Spirited Away'),
    (SELECT id FROM genres WHERE name = 'Fantasy')
  );
