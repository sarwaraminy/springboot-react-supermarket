package com.shops.supermarket.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.shops.supermarket.entity.Sale;
import com.shops.supermarket.repos.SaleRepository;

@Service
public class SaleService {
    
    @Autowired private SaleRepository saleRepository;

    // Save Sale information
    public Sale saveSale(Sale sales){
        return saleRepository.save(sales);
    }
}
