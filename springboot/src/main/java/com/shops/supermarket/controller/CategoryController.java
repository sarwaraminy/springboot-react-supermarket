package com.shops.supermarket.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
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

    // add new category
    @PostMapping("/category/add")
    public ResponseEntity<Category> createCategory(@RequestBody Category category) {
        Category createCategory = categoryService.savCategory(category);
        return ResponseEntity.status(HttpStatus.CREATED).body(createCategory);
    }

    // Update a record
    @PutMapping("category/{id}")
    public ResponseEntity<Category> updateCategory(@PathVariable Long id, @RequestBody Category categoryDetails) {
        // Check the category is exist or not
        Category categoryId = categoryService.getCategoryById(id);
        if (categoryId != null) {
            Category category = categoryService.savCategory(categoryDetails);
            return ResponseEntity.ok(category);
        } else {
            return ResponseEntity.notFound().build();
        }
        
    }

    // delete a record
    @DeleteMapping("/category/{id}")
    public ResponseEntity<Category> deleteCategory(@PathVariable Long id) {
        Category category = categoryService.getCategoryById(id);
        if (category != null) {
            categoryService.deleteCategory(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
}
