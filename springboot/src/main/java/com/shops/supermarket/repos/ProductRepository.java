package com.shops.supermarket.repos;

import org.springframework.data.jpa.repository.JpaRepository;

import com.shops.supermarket.entity.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {
    
}
