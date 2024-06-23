package com.shops.supermarket.repos;

import org.springframework.data.jpa.repository.JpaRepository;

import com.shops.supermarket.entity.Order;

public interface OrderRepository extends JpaRepository<Order, Long> {
}
