package com.hrplatform.service;

import java.util.List;
import com.hrplatform.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hrplatform.model.Category;
import com.hrplatform.repository.CategoryRepository;
import com.hrplatform.repository.SkillRepository;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;
    @Autowired
	private SkillRepository skillRepository;

    @Override
    public Category addCategory(Category category) {
        if (categoryRepository.findByNameContainingIgnoreCase(category.getName()).size() > 0) {
            throw new RuntimeException("Category already exists");
        }
        return categoryRepository.save(category);
    }

    @Override
    public Category updateCategory(Long id, Category category) {
        Category existing = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + id));
        existing.setName(category.getName());
        return categoryRepository.save(existing);
    }

//    @Override
//    public void deleteCategory(Long id) {
//        categoryRepository.deleteById(id);
//    }
    @Override
    public void deleteCategory(Long id) {
        Category category = categoryRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Category not found"));

        if (skillRepository.existsByCategory(category)) {
            throw new RuntimeException("Cannot delete category. Delete related skills first.");
        }

        categoryRepository.delete(category);
    }

    @Override
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    @Override
    public Category getCategoryById(Long id) {
        return categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + id));
    }

    @Override
    public List<Category> searchByName(String name) {
        return categoryRepository.findByNameContainingIgnoreCase(name);
    }
}