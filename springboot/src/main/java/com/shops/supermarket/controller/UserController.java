package com.shops.supermarket.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shops.supermarket.dto.LoginRequest;
import com.shops.supermarket.dto.LoginResponse;
import com.shops.supermarket.dto.SignupRequest;
import com.shops.supermarket.entity.User;
import com.shops.supermarket.service.UserService;


@RestController
@RequestMapping(path="/auth")
@CrossOrigin(origins="*")
public class UserController {
    
    @Autowired private UserService userService;

    // get all user
    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    // register a new user
    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody SignupRequest signupRequest) {

        if (userService.existsByEmail(signupRequest.getEmail())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Email is already in use.");
        }

        User user = new User();
        user.setEmail(signupRequest.getEmail());
        user.setPassword(signupRequest.getPassword()); // Make sure to hash the password properly
        user.setRole(signupRequest.getRole());
        user.setLangCode(signupRequest.getLangCode());
        user.setFirstname(signupRequest.getFirstname());
        user.setLastname(signupRequest.getLastname());

        // Save new user
        userService.saveUser(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(user);
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest) {
        Optional<User> userOptional = userService.authenticateUser(loginRequest.getEmail(), loginRequest.getPassword());
        if (userOptional.isPresent()) {
            User user = userOptional.get();

            // Create Response object
            LoginResponse response = new LoginResponse();
            response.setId(user.getId());
            response.setEmail(user.getEmail());
            response.setRole(user.getRole());
            response.setFirstName(user.getFirstname());
            response.setLastName(user.getLastname());
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
        }
    }
}
