package com.shops.supermarket.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;

import com.shops.supermarket.dto.SaleDTO;
import com.shops.supermarket.entity.Product;
import com.shops.supermarket.entity.Sale;
import com.shops.supermarket.entity.SaleItem;
import com.shops.supermarket.entity.User;
import com.shops.supermarket.repos.ProductRepository;
import com.shops.supermarket.service.JwtService;
import com.shops.supermarket.service.SaleService;
import com.shops.supermarket.service.UserService;



@Controller
@CrossOrigin(origins = "*")
@RequestMapping(path = "/api")
public class SaleController {
    
    @Autowired private JwtService jwtService;
    @Autowired private SaleService saleService;
    @Autowired private UserService userService;
    @Autowired private ProductRepository productRepository;

    // Save the Sale information
    @PostMapping("/sale/save")
    public ResponseEntity<Sale> createSale(@RequestBody SaleDTO saleDTO, @RequestHeader("Authorization") String authHeader) {
        
        // Extract email from token
        String email = jwtService.extractEmailFromToken(authHeader);
        User user = userService.getUserByEmail(email);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }

        Sale sale = new Sale();
        sale.setUser(user);
        sale.setTotalAmount(saleDTO.getTotalAmount());
        sale.setPaymentMethod(saleDTO.getPaymentMethod());
        sale.setStatus(saleDTO.getStatus());

        List<SaleItem> saleItems = saleDTO.getSaleItems().stream().map(itemDTO -> {
            SaleItem saleItem = new SaleItem();
            saleItem.setSale(sale);
            Product product = productRepository.findById(itemDTO.getProductId()).orElse(null);
            if (product == null) {
                throw new RuntimeException("Product not found: " + itemDTO.getProductId());
            }
            saleItem.setProduct(product);
            saleItem.setQuantity(itemDTO.getQuantity());
            saleItem.setPrice(itemDTO.getPrice());
            saleItem.setDiscount(itemDTO.getDiscount());
            return saleItem;
        }).collect(Collectors.toList());

        Sale savedSale = saleService.saveSaleWithItems(sale, saleItems);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedSale);
    }
    
}
