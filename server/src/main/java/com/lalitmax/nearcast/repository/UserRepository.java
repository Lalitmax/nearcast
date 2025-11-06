package com.lalitmax.nearcast.repository;

import com.lalitmax.nearcast.model.User;

import java.util.List;

import org.springframework.stereotype.Repository;
import org.springframework.jdbc.core.JdbcTemplate;


@Repository
public class UserRepository{
    private final JdbcTemplate jdbcTemplate;

    public UserRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<User> findAll() {
        return jdbcTemplate.query("SELECT * FROM users", new UserRowMapper());
    }

    public User save(User user) {
        // Check if database exists, create if not
        try {
            jdbcTemplate.execute("CREATE DATABASE IF NOT EXISTS nearcast_db");
        } catch (Exception e) {
            // Database might already exist or we don't have permission to create it
            // Continue with table creation
        }

        // Ensure we're using the correct database
        try {
            jdbcTemplate.execute("USE nearcast_db");
        } catch (Exception e) {
            // Already using the database
        }

        // Create users table if it doesn't exist
        jdbcTemplate.execute(
            "CREATE TABLE IF NOT EXISTS users (" +
            "id BIGINT AUTO_INCREMENT PRIMARY KEY, " +
            "name VARCHAR(255) NOT NULL, " +
            "email VARCHAR(255) NOT NULL UNIQUE, " +
            "password VARCHAR(255) NOT NULL, " +
            "zipcode VARCHAR(20) NOT NULL, " +
            "created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP" +
            ")"
        );

        // Insert the user data
        jdbcTemplate.update("INSERT INTO users (name, email, password, zipcode) VALUES (?, ?, ?, ?)",
                user.getName(), user.getEmail(), user.getPassword(), user.getZipcode());
        return user;
    }

    public boolean existsByEmail(String email) {
        return jdbcTemplate.queryForObject(
                "SELECT EXISTS(SELECT 1 FROM users WHERE email = ?)",
                Boolean.class,
                email
        );
    }

    public boolean existsByEmailAndPassword(String email, String password) {
        return jdbcTemplate.queryForObject(
                "SELECT EXISTS(SELECT 1 FROM users WHERE email = ? AND password = ?)",
                Boolean.class,
                email, password
        );
    }
}
