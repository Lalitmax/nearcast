package com.lalitmax.nearcast.controller;

import com.lalitmax.nearcast.dto.SigninRequest;
import com.lalitmax.nearcast.dto.SignupRequest;
import com.lalitmax.nearcast.service.AuthService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    
    @Autowired
    private final AuthService authService;
    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/signup")
    public String signup(@RequestBody SignupRequest request) {
        return authService.registerUser(request);
    }

    @PostMapping("/signin")
    public String signin(@RequestBody SigninRequest request) {
        return authService.loginUser(request);
    }
}   

