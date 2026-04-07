package com.hrplatform.service;

import java.util.List;

import com.hrplatform.model.Skill;

public interface SkillService {

    Skill addSkill(Skill skill);

    Skill updateSkill(Long id, Skill skill);

    void deleteSkill(Long id);

    List<Skill> getAllSkills();

    Skill getSkillById(Long id);

    List<Skill> searchByName(String name);

    List<Skill> searchByCategory(String categoryName);

}