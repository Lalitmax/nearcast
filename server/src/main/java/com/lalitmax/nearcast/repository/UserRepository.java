package com.lalitmax.nearcast.repository;

import com.lalitmax.nearcast.model.User;
import org.springframework.stereotype.Repository;
import java.util.List;

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
