package com.hrplatform.service;

import java.util.List;

import com.hrplatform.model.Category;

public interface CategoryService {

    Category addCategory(Category category);

    Category updateCategory(Long id, Category category);

    void deleteCategory(Long id);

    List<Category> getAllCategories();

    Category getCategoryById(Long id);

    List<Category> searchByName(String name);

}