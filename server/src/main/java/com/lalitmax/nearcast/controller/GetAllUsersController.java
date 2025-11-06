package com.lalitmax.nearcast.controller;

import com.lalitmax.nearcast.model.User;
import com.lalitmax.nearcast.service.GetAllUsersService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
public class GetAllUsersController {

    @Autowired
    private final GetAllUsersService getAllUsersService;

    public GetAllUsersController(GetAllUsersService getAllUsersService) {
        this.getAllUsersService = getAllUsersService;
    }

    @GetMapping("/getallusers")
    public List<User> getAllUsers() {
        return getAllUsersService.getAllUsers();
    }
}
