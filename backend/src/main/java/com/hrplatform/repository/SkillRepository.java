package com.hrplatform.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hrplatform.model.Category;
import com.hrplatform.model.Skill;

@Repository
public interface SkillRepository extends JpaRepository<Skill, Long> {

    //List<Skill> findByNameIgnoreCase(String name);
    //List<Skill> findByCategoryName(String categoryName);
    
	List<Skill> findByNameContainingIgnoreCase(String name);

	List<Skill> findByCategory_NameContainingIgnoreCase(String categoryName);
	
    boolean existsByCategory(Category category);
    
    boolean existsByNameIgnoreCase(String name);

}