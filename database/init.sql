BEGIN;

-- Remove existing tables and repopulate db when script runs
DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL
);

INSERT INTO users (name, email) VALUES (
    'Grace Hopper',
    'gracehopper@gmail.com'
);

COMMIT;