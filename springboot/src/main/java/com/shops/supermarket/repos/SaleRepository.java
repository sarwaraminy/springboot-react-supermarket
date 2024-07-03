package com.shops.supermarket.repos;

import org.springframework.data.jpa.repository.JpaRepository;

import com.shops.supermarket.entity.Sale;

public interface SaleRepository extends JpaRepository<Sale, Long> {
    
}
