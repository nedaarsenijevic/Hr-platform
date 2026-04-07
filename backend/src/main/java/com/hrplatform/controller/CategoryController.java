package com.hrplatform.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hrplatform.model.Category;
import com.hrplatform.service.CategoryService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    // Dodaj kategoriju
	/*
	 * @PostMapping public ResponseEntity<Category> addCategory(@RequestBody
	 * Category category) { Category saved = categoryService.addCategory(category);
	 * return new ResponseEntity<>(saved, HttpStatus.CREATED); }
	 */
    @PostMapping
    public ResponseEntity<?> addCategory(@Valid @RequestBody Category category) {
        try {
            Category saved = categoryService.addCategory(category);
            return new ResponseEntity<>(saved, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    // Azuriraj kategoriju
    @PutMapping("/{id}")
    public ResponseEntity<Category> updateCategory(@PathVariable Long id, 
                                                   @Valid @RequestBody Category category) {
        Category updated = categoryService.updateCategory(id, category);
        return new ResponseEntity<>(updated, HttpStatus.OK);
    }

    // Obrisi kategoriju
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCategory(@PathVariable Long id) {
        categoryService.deleteCategory(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    // Sve kategorije
    @GetMapping
    public ResponseEntity<List<Category>> getAllCategories() {
        List<Category> categories = categoryService.getAllCategories();
        return new ResponseEntity<>(categories, HttpStatus.OK);
    }

    // Pronadji kategoriju po id
    @GetMapping("/{id}")
    public ResponseEntity<Category> getCategoryById(@PathVariable Long id) {
        Category category = categoryService.getCategoryById(id);
        return new ResponseEntity<>(category, HttpStatus.OK);
    }

    // Pretraga po imenu
    @GetMapping("/search")
    public ResponseEntity<List<Category>> searchByName(@RequestParam String name) {
        List<Category> categories = categoryService.searchByName(name);
        return new ResponseEntity<>(categories, HttpStatus.OK);
    }
}