package com.shops.supermarket.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.shops.supermarket.entity.Sale;
import com.shops.supermarket.service.SaleService;



@Controller
@CrossOrigin(origins = "*")
@RequestMapping(path = "/api")
public class SaleController {
    
    @Autowired private SaleService saleService;

    // Save the Sale information
    @PostMapping("/sale/save")
    public ResponseEntity<Sale> createSale(@RequestBody Sale sale){
        Sale saveSale = saleService.saveSale(sale);
        return  ResponseEntity.status(HttpStatus.CREATED).body(saveSale);
    }
    
}
