CREATE DATABASE gameproject;


-- create extension if not exists "uuid-ossp";
CREATE TABLE users(
    user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_name VARCHAR(255) NOT NULL,
    user_last_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL
);

INSERT INTO users(user_name, user_last_name, user_email,user_password) VALUES ('axel', 'angelini', 'sadasd@gmail.com','123312');