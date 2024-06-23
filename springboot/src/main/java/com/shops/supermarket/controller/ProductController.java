package com.shops.supermarket.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.shops.supermarket.entity.Product;
import com.shops.supermarket.service.ProductService;
import com.shops.supermarket.service.TranslationService;

@Controller
@RequestMapping(path="/api")
@CrossOrigin(origins="*")
public class ProductController {

    @Autowired
    private ProductService productService;

    @Autowired
    private TranslationService translationService;

    // get all user
    @GetMapping("/products")
    public ResponseEntity<List<Product>> getProductList() {
        List<Product> products = productService.getAllProducts();
        return ResponseEntity.ok(products);
    }

    @GetMapping("/product")
    public String getAllProducts(@RequestParam Long productId, @RequestParam(required = false) String lang, Model model) {
        Product product = productService.getProductById(productId);
        model.addAttribute("product", product);

        String langCode = (lang != null) ? lang : "en";
        Map<String, String> translations = translationService.getTranslations("products", productId, langCode);
        model.addAllAttributes(translations);

        return "product";
    }

    @GetMapping("/product/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Long id){
        Product product = productService.getProductById(id);
        if(product != null){
            return ResponseEntity.ok(product);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
