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