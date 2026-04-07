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

import com.hrplatform.model.Candidate;
import com.hrplatform.service.CandidateService;

@RestController
@RequestMapping("/api/candidates")
public class CandidateController {

    @Autowired
    private CandidateService candidateService;

    // Dodaj kandidata
    @PostMapping
    public ResponseEntity<Candidate> addCandidate(@RequestBody Candidate candidate) {
        Candidate saved = candidateService.addCandidate(candidate);
        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }

    // Azuriraj kandidata
    @PutMapping("/{id}")
    public ResponseEntity<Candidate> updateCandidate(@PathVariable Long id,
                                                      @RequestBody Candidate candidate) {
        Candidate updated = candidateService.updateCandidate(id, candidate);
        return new ResponseEntity<>(updated, HttpStatus.OK);
    }

    // Obrisi kandidata
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCandidate(@PathVariable Long id) {
        candidateService.deleteCandidate(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    // Dodaj vestinu kandidatu
    @PostMapping("/{candidateId}/skills/{skillId}")
    public ResponseEntity<Candidate> addSkillToCandidate(@PathVariable Long candidateId,
                                                          @PathVariable Long skillId) {
        Candidate candidate = candidateService.addSkillToCandidate(candidateId, skillId);
        return new ResponseEntity<>(candidate, HttpStatus.OK);
    }

    // Ukloni vestinu sa kandidata
    @DeleteMapping("/{candidateId}/skills/{skillId}")
    public ResponseEntity<Candidate> removeSkillFromCandidate(@PathVariable Long candidateId,
                                                               @PathVariable Long skillId) {
        Candidate candidate = candidateService.removeSkillFromCandidate(candidateId, skillId);
        return new ResponseEntity<>(candidate, HttpStatus.OK);
    }

    // Svi kandidati
    @GetMapping
    public ResponseEntity<List<Candidate>> getAllCandidates() {
        List<Candidate> candidates = candidateService.getAllCandidates();
        return new ResponseEntity<>(candidates, HttpStatus.OK);
    }

    // Pronadji kandidata po id
    @GetMapping("/{id}")
    public ResponseEntity<Candidate> getCandidateById(@PathVariable Long id) {
        Candidate candidate = candidateService.getCandidateById(id);
        return new ResponseEntity<>(candidate, HttpStatus.OK);
    }

    // Pretraga po imenu - koristi SearchByNameStrategy
    @GetMapping("/search/name")
    public ResponseEntity<List<Candidate>> searchByName(@RequestParam String name) {
        List<Candidate> candidates = candidateService.searchByName(name);
        return new ResponseEntity<>(candidates, HttpStatus.OK);
    }

    // Pretraga po vestini - koristi SearchBySkillStrategy
    @GetMapping("/search/skill")
    public ResponseEntity<List<Candidate>> searchBySkill(@RequestParam String skillName) {
        List<Candidate> candidates = candidateService.searchBySkill(skillName);
        return new ResponseEntity<>(candidates, HttpStatus.OK);
    }

    // Pretraga po emailu
    @GetMapping("/search/email")
    public ResponseEntity<List<Candidate>> searchByEmail(@RequestParam String email) {
        List<Candidate> candidates = candidateService.searchByEmail(email);
        return new ResponseEntity<>(candidates, HttpStatus.OK);
    }
}