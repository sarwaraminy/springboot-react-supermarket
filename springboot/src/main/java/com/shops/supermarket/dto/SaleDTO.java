package com.shops.supermarket.dto;

import java.math.BigDecimal;
import java.util.List;

import com.shops.supermarket.entity.User;

public class SaleDTO {
    private User user;
    private BigDecimal totalAmount;
    private String paymentMethod;
    private String status;
    private List<SaleItemDTO> saleItems;

    // Getters and setters...


    public User getUser() {
        return this.user;
    }

    public void setUser(User user) {
        this.user = user;
    }
    

    public BigDecimal getTotalAmount() {
        return this.totalAmount;
    }

    public void setTotalAmount(BigDecimal totalAmount) {
        this.totalAmount = totalAmount;
    }

    public String getPaymentMethod() {
        return this.paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public String getStatus() {
        return this.status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public List<SaleItemDTO> getSaleItems() {
        return this.saleItems;
    }

    public void setSaleItems(List<SaleItemDTO> saleItems) {
        this.saleItems = saleItems;
    }

}
