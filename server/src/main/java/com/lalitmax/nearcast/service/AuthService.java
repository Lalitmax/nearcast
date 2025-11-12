package com.lalitmax.nearcast.service;

import com.lalitmax.nearcast.model.User;

import org.springframework.stereotype.Service;

import com.lalitmax.nearcast.dto.SigninRequest;
import com.lalitmax.nearcast.dto.SignupRequest;
import com.lalitmax.nearcast.repository.UserRepository;

@Service
public class AuthService  {
    private final UserRepository userRepository;

    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    public String registerUser(SignupRequest req) {

            User user = new User();
            user.setName(req.getName());
            user.setEmail(req.getEmail());
            user.setPassword(req.getPassword());
            user.setPincode(req.getPincode());
            userRepository.save(user);
            return "User registered successfully!";
    }

    public String loginUser(SigninRequest req) {
        if (userRepository.existsByEmailAndPassword(req.getEmail(), req.getPassword())) {
            return "Login successful!";
        } else {
            return "Invalid credentials!";
        }
    }
}
