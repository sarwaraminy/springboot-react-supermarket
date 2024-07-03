package com.shops.supermarket.repos;

import org.springframework.data.jpa.repository.JpaRepository;

import com.shops.supermarket.entity.SaleItem;

public interface SaleItemRepository extends JpaRepository<SaleItem, Long> {
    
}
