package com.shops.supermarket.entity;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    //@Column(name = "sku", nullable = false, unique = true)
    //private String sku;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "description")
    private String description;

    //@ManyToOne
    //@JoinColumn(name = "category_id")
    //private Category category;

    @Column(name = "price", nullable = false)
    private BigDecimal price;

    @Column(name = "quantity", nullable = false)
    private int quantity;

    @Column(name = "discount")
    private int discount;
    
    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt = LocalDateTime.now();

    //@OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
    //private List<OrderItem> orderItems;

    //@OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
    //private List<ProductSupplier> productSuppliers;

    // Getters and Setters
    // ...

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    //public String getSku() {
    //    return this.sku;
    //}

    //public void setSku(String sku) {
    //    this.sku = sku;
    //}

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return this.description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    //public Category getCategory() {
    //    return this.category;
    //}
//
    //public void setCategory(Category category) {
    //    this.category = category;
    //}

    public BigDecimal getPrice() {
        return this.price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public int getQuantity() {
        return this.quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public int getDiscount() {
        return this.discount;
    }

    public void setDiscount(int discount) {
        this.discount = discount;
    }

    public LocalDateTime getCreatedAt() {
        return this.createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return this.updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
//
    //public List<OrderItem> getOrderItems() {
    //    return this.orderItems;
    //}
//
    //public void setOrderItems(List<OrderItem> orderItems) {
    //    this.orderItems = orderItems;
    //}
//
    //public List<ProductSupplier> getProductSuppliers() {
    //    return this.productSuppliers;
    //}
//
    //public void setProductSuppliers(List<ProductSupplier> productSuppliers) {
    //    this.productSuppliers = productSuppliers;
    //}
//
}
