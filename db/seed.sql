CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR (240),
    password VARCHAR (240),
    username UNIQUE VARCHAR (50),
    runs int
);

CREATE TABLE leaderboard (
    username VARCHAR (50) REFERENCES users(username),
    floors int,
    score int,
    death VARCHAR (360)
);

CREATE TABLE monsters (
    id INT REFERENCES users(id),
    name VARCHAR (240),
    class VARCHAR (50),
    health INT,
    weaknesses VARCHAR (30),
    resistances VARCHAR (30),
    attack1name VARCHAR (120),
    attack1type VARCHAR (30),
    attack1damage INT,
    attack2name VARCHAR (120),
    attack2type VARCHAR (30),
    attack2damage INT,
    xp INT,
    score INT,
    username VARCHAR (240)
);