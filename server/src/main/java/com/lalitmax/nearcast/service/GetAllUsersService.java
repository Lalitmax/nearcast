package com.lalitmax.nearcast.service;

import com.lalitmax.nearcast.model.User;

import java.util.List;

import org.springframework.stereotype.Service;
import com.lalitmax.nearcast.repository.UserRepository;

@Service
public class GetAllUsersService {
    
    private final UserRepository userRepository;

    public GetAllUsersService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}
