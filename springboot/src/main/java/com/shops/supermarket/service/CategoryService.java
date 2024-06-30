package com.shops.supermarket.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.shops.supermarket.entity.Category;
import com.shops.supermarket.repos.CategoryRepository;

@Service
public class CategoryService {
    
    @Autowired private CategoryRepository categoryRepository;

    //
	public List<Category> getAllCategories(){ //get all records from Category table
		Iterable<Category> iterable = categoryRepository.findAll();
		List<Category> categoryList = new ArrayList<>();
		iterable.forEach(categoryList::add);
		return categoryList;
	}

	// Get category by id
	public Category getCategoryById(Long id){
		Optional<Category> category = categoryRepository.findById(id);
		return category.orElse(null);
	}
}
