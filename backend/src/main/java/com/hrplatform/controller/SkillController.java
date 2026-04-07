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

import com.hrplatform.model.Skill;
import com.hrplatform.service.SkillService;

@RestController
@RequestMapping("/api/skills")
public class SkillController {

    @Autowired
    private SkillService skillService;

    // Dodaj vestinu
    @PostMapping
    public ResponseEntity<Skill> addSkill(@RequestBody Skill skill) {
        Skill saved = skillService.addSkill(skill);
        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }

    // Azuriraj vestinu
    @PutMapping("/{id}")
    public ResponseEntity<Skill> updateSkill(@PathVariable Long id,
                                              @RequestBody Skill skill) {
        Skill updated = skillService.updateSkill(id, skill);
        return new ResponseEntity<>(updated, HttpStatus.OK);
    }

    // Obrisi vestinu
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSkill(@PathVariable Long id) {
        skillService.deleteSkill(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    // Sve vestine
    @GetMapping
    public ResponseEntity<List<Skill>> getAllSkills() {
        List<Skill> skills = skillService.getAllSkills();
        return new ResponseEntity<>(skills, HttpStatus.OK);
    }

    // Pronadji vestinu po id
    @GetMapping("/{id}")
    public ResponseEntity<Skill> getSkillById(@PathVariable Long id) {
        Skill skill = skillService.getSkillById(id);
        return new ResponseEntity<>(skill, HttpStatus.OK);
    }

    // Pretraga po imenu
    @GetMapping("/search")
    public ResponseEntity<List<Skill>> searchByName(@RequestParam String name) {
        List<Skill> skills = skillService.searchByName(name);
        return new ResponseEntity<>(skills, HttpStatus.OK);
    }

    // Pretraga po kategoriji
    @GetMapping("/category")
    public ResponseEntity<List<Skill>> searchByCategory(@RequestParam String categoryName) {
        List<Skill> skills = skillService.searchByCategory(categoryName);
        return new ResponseEntity<>(skills, HttpStatus.OK);
    }
}