package com.hrplatform.service;

import java.util.List;
import com.hrplatform.exception.ResourceNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hrplatform.model.Skill;
import com.hrplatform.model.Category;
import com.hrplatform.repository.SkillRepository;
import com.hrplatform.repository.CategoryRepository;

@Service
public class SkillServiceImpl implements SkillService {

    @Autowired
    private SkillRepository skillRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public Skill addSkill(Skill skill) {

        if(skillRepository.existsByNameIgnoreCase(skill.getName())) {
            throw new RuntimeException("Skill already exists");
        }

        return skillRepository.save(skill);
    }

    @Override
    public Skill updateSkill(Long id, Skill skill) {

        Skill existing = skillRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Skill not found with id: " + id));

        if(skillRepository.existsByNameIgnoreCase(skill.getName())
           && !existing.getName().equalsIgnoreCase(skill.getName())) {
            throw new RuntimeException("Skill already exists");
        }

        existing.setName(skill.getName());
        existing.setDescription(skill.getDescription());
        existing.setCategory(skill.getCategory());

        return skillRepository.save(existing);
    }

    @Override
    public void deleteSkill(Long id) {
        skillRepository.deleteById(id);
    }

    @Override
    public List<Skill> getAllSkills() {
        return skillRepository.findAll();
    }

    @Override
    public Skill getSkillById(Long id) {
        return skillRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Skill not found with id: " + id));
    }

    @Override
    public List<Skill> searchByName(String name) {
        return skillRepository.findByNameContainingIgnoreCase(name);
    }

    @Override
    public List<Skill> searchByCategory(String categoryName) {
        return skillRepository.findByCategory_NameContainingIgnoreCase(categoryName);
    }
}
