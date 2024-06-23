package com.shops.supermarket.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.shops.supermarket.entity.Product;
import com.shops.supermarket.service.ProductService;
import com.shops.supermarket.service.TranslationService;

@Controller
public class ProductController {

    @Autowired
    private ProductService productService;

    @Autowired
    private TranslationService translationService;

    @GetMapping("/product")
    public String getProduct(@RequestParam Long productId, @RequestParam(required = false) String lang, Model model) {
        Product product = productService.getProductById(productId);
        model.addAttribute("product", product);

        String langCode = (lang != null) ? lang : "en";
        Map<String, String> translations = translationService.getTranslations("products", productId, langCode);
        model.addAllAttributes(translations);

        return "product";
    }
}
