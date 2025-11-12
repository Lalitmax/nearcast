package com.lalitmax.nearcast.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

@Table("users")
@Data
public class User {
    // User model for database
    @Id
    private Long id;
    private String name;
    private String email;
    private String password;
    private String pincode; // User's current location
}