package com.shops.supermarket.repos;

import org.springframework.data.jpa.repository.JpaRepository;

import com.shops.supermarket.entity.OrderItem;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
}
