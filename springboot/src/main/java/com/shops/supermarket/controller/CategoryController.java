package com.shops.supermarket.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;

import com.shops.supermarket.entity.Category;
import com.shops.supermarket.entity.User;
import com.shops.supermarket.service.CategoryService;
import com.shops.supermarket.service.JwtService;
import com.shops.supermarket.service.TranslationService;
import com.shops.supermarket.service.UserService;


@Controller
@RequestMapping(path="/api")
@CrossOrigin(origins="*")
public class CategoryController {
    
    @Autowired JwtService jwtService;
    @Autowired private CategoryService categoryService;
    @Autowired private UserService userService;
    @Autowired private TranslationService translationService;

    // get all Categories
    @PostMapping("/categories")
    public ResponseEntity<List<Category>> getProductList(@RequestHeader("Authorization") String authHeader) {
        // Extract email from token
        String email = jwtService.extractEmailFromToken(authHeader);
        User user = userService.getUserByEmail(email);
        List<Category> categories = categoryService.getAllCategories();

        // Translate Category based on user's language preference
        String language = user.getLangCode();
        List<Category> translatedCategory = translationService.translateCategories(categories, language);

        return ResponseEntity.ok(translatedCategory);
    }
}
