package com.shops.supermarket.repos;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.shops.supermarket.entity.User;



public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);
}
