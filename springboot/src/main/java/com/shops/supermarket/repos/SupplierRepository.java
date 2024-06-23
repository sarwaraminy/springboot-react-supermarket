package com.shops.supermarket.repos;

import org.springframework.data.jpa.repository.JpaRepository;

import com.shops.supermarket.entity.Supplier;

public interface SupplierRepository extends JpaRepository<Supplier, Long> {
}
