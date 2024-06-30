package com.shops.supermarket.controller;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.shops.supermarket.entity.Category;
import com.shops.supermarket.entity.Product;
import com.shops.supermarket.entity.User;
import com.shops.supermarket.service.CategoryService;
import com.shops.supermarket.service.ProductService;
import com.shops.supermarket.service.TranslationService;
import com.shops.supermarket.service.UserService;




@Controller
@RequestMapping(path="/api")
@CrossOrigin(origins="*")
public class ProductController {

    @Autowired private ProductService productService;

    @Autowired private TranslationService translationService;

    @Autowired private UserService userService;

    @Autowired private CategoryService categoryService;

    // get all user
    @GetMapping("/products/{email}")
    public ResponseEntity<List<Product>> getProductList(@PathVariable String email) {
        User user = userService.getUserByEmail(email);
        List<Product> products = productService.getAllProducts();

        // Translate products based on user's language preference
        String language = user.getLangCode();

        // Fetch and translate categories
        List<Category> categories = products.stream()
            .map(Product::getCategory)
            .distinct()
            .collect(Collectors.toList());

        List<Category> translatedCategories = translationService.translateCategories(categories, language);
        
        // Create a map for translated categories for easy lookup
        Map<Long, String> translatedCategoryMap = translatedCategories.stream()
          .collect(Collectors.toMap(Category::getId, Category::getName));
        
        // Apply translated category names to products
        List<Product> translatedProducts = products.stream().map(product -> {
            String translatedCategoryName = translatedCategoryMap.get(product.getCategory().getId());
            product.getCategory().setName(translatedCategoryName); // Apply translated category name
            return product;
        }).collect(Collectors.toList());

        // Translate other product fields if necessary
        translatedProducts = translationService.translateProducts(translatedProducts, language);
        //System.out.println("Pulled product: " + translatedProducts);
        return ResponseEntity.ok(translatedProducts);
    }

    //
    @GetMapping("/product/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Long id){
        Product product = productService.getProductById(id);
        if(product != null){
            return ResponseEntity.ok(product);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Create product
    @PostMapping("/product/add")
    public ResponseEntity<Product> createProduct(@RequestBody Product product){
        // Print the received product to the console
        //System.out.println("Received product: " + product);
        Product createProduct = productService.saveProduct(product);
        return ResponseEntity.status(HttpStatus.CREATED).body(createProduct);
    }

    // Update product based on product id 
    // Manual Mapping: You can extract categoryId from the request body and then set the Category in the Product entity
    @PutMapping("product/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable Long id, @RequestBody Map<String, Object> productDetail) {
        Product product = productService.getProductById(id);
        if (product != null) {
            product.setName((String) productDetail.get("name"));
            product.setDescription((String) productDetail.get("description"));
            product.setPrice(new BigDecimal(productDetail.get("price").toString()));
            product.setQuantity((Integer) productDetail.get("quantity"));
            product.setDiscount((Integer) productDetail.get("discount"));

            // Update category
            if (productDetail.containsKey("categoryId")) {
                Long categoryId = Long.valueOf(productDetail.get("categoryId").toString());
                Category category = categoryService.getCategoryById(categoryId);
                product.setCategory(category);
            }

            // Update timestamps
            product.setUpdatedAt(LocalDateTime.now());

            // Update product
            Product updatedProduct = productService.saveProduct(product);
            return ResponseEntity.ok(updatedProduct);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Delete a product
    @DeleteMapping("product/{id}")
    public ResponseEntity<Product> deleteOneProduct(@PathVariable long id) {
        Product product = productService.getProductById(id);
        if(product != null ){
            productService.deleteAProduct(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
}
