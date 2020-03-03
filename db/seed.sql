CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR (240),
    password VARCHAR (240),
    username VARCHAR (50),
    runs int
);

CREATE TABLE leaderboard (
    username VARCHAR (50) REFERENCES users(username),
    floors int,
    score int,
    death VARCHAR (360)
);