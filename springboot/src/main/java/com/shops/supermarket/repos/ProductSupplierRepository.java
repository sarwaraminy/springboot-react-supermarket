package com.shops.supermarket.repos;

import org.springframework.data.jpa.repository.JpaRepository;

import com.shops.supermarket.entity.ProductSupplier;

public interface ProductSupplierRepository extends JpaRepository<ProductSupplier, Long> {
}
