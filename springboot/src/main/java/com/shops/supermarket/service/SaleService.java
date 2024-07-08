package com.shops.supermarket.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.shops.supermarket.entity.Sale;
import com.shops.supermarket.entity.SaleItem;
import com.shops.supermarket.repos.SaleItemRepository;
import com.shops.supermarket.repos.SaleRepository;

import jakarta.transaction.Transactional;

@Service
public class SaleService {
    
    @Autowired
    private SaleRepository saleRepository;

    @Autowired
    private SaleItemRepository saleItemRepository;

    @Transactional
    public Sale saveSaleWithItems(Sale sale, List<SaleItem> saleItems) {
        Sale savedSale = saleRepository.save(sale);
        saleItems.forEach(item -> item.setSale(savedSale));
        saleItemRepository.saveAll(saleItems);
        return savedSale;
    }
}
