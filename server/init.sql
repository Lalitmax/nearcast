CREATE DATABASE IF NOT EXISTS nearcast_db;

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(255),
    pincode VARCHAR(10),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Media files table
CREATE TABLE IF NOT EXISTS media_files (
    user_id INT,
    pincode VARCHAR(10),
    time DATETIME DEFAULT CURRENT_TIMESTAMP,
    url VARCHAR(255),
    format CHAR(1)
);