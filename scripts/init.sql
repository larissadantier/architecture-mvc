-- Create DB (database)
DROP DATABASE IF EXISTS crud_users;
CREATE DATABASE crud_users;

\c crud_users

-- Create Tables
DROP TABLE IF EXISTS users;
CREATE TABLE IF NOT EXISTS users(
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(20),
  last_name VARCHAR(60),
  email VARCHAR(256) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT NULL
);


-- User - Seed DB
DO $$
DECLARE
  i INT := 1;
  created_users INT := 0;
  user_id INT;
BEGIN
  WHILE i <= 5 LOOP
    INSERT INTO users(first_name, last_name, email)
    VALUES('User-' || i, 'Doe-' || i, 'user.' || i || '@email.com')
    RETURNING id INTO user_id;

    i := i + 1;
    created_users := created_users + 1;
  END LOOP;

  RAISE NOTICE '% users successfully created', created_users;
END $$