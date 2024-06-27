package com.shops.supermarket.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.shops.supermarket.entity.Category;
import com.shops.supermarket.entity.Product;
import com.shops.supermarket.repos.CategoryRepository;
import com.shops.supermarket.repos.ProductRepository;

@Service
public class ProductService {
    
    @Autowired
    private ProductRepository productRepository;
    @Autowired 
    private CategoryRepository categoryRepository;

    //
	public List<Product> getAllProducts(){ //get all records from Users table
		Iterable<Product> iterable = productRepository.findAll();
		List<Product> productList = new ArrayList<>();
		iterable.forEach(productList::add);
		return productList;
	}

    //
    public Product getProductById(Long id){
        return productRepository.findById(id).orElse(null);
    }

    // Create Product
    public Product saveProduct(Product product) {
        if (product.getCategory() != null && product.getCategory().getId() != null) {
            Category category = categoryRepository.findById(product.getCategory().getId()).orElse(null);
            if (category != null) {
                product.setCategory(category);
            }
        }
        return productRepository.save(product);
    }

    // Delete a record
    public void deleteAProduct(Long id){
        productRepository.deleteById(id);
    }
}
