package com.hrplatform.service;

import java.util.List;
import com.hrplatform.exception.ResourceNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hrplatform.model.Candidate;
import com.hrplatform.model.Skill;
import com.hrplatform.repository.CandidateRepository;
import com.hrplatform.repository.SkillRepository;
import com.hrplatform.strategy.SearchByNameStrategy;
import com.hrplatform.strategy.SearchBySkillStrategy;

@Service
public class CandidateServiceImpl implements CandidateService {

    @Autowired
    private CandidateRepository candidateRepository;

    @Autowired
    private SkillRepository skillRepository;
    
    @Autowired
    private SearchByNameStrategy searchByNameStrategy;

    @Autowired
    private SearchBySkillStrategy searchBySkillStrategy;

    @Override
    public Candidate addCandidate(Candidate candidate) {
        return candidateRepository.save(candidate);
    }

    @Override
    public Candidate updateCandidate(Long id, Candidate candidate) {
        Candidate existing = candidateRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Candidate not found with id: " + id));
        existing.setFirstName(candidate.getFirstName());
        existing.setLastName(candidate.getLastName());
        existing.setDateOfBirth(candidate.getDateOfBirth());
        existing.setContactNumber(candidate.getContactNumber());
        existing.setEmail(candidate.getEmail());
        return candidateRepository.save(existing);
    }

    @Override
    public void deleteCandidate(Long id) {
        candidateRepository.deleteById(id);
    }

    @Override
    public Candidate addSkillToCandidate(Long candidateId, Long skillId) {
        Candidate candidate = candidateRepository.findById(candidateId)
                .orElseThrow(() -> new ResourceNotFoundException("Candidate not found with id: " + candidateId));
        Skill skill = skillRepository.findById(skillId)
                .orElseThrow(() -> new ResourceNotFoundException("Skill not found with id: " + skillId));
        if (candidate.getSkills().contains(skill)) {
            throw new IllegalArgumentException("Skill already assigned to candidate");
        }
        candidate.getSkills().add(skill);
        return candidateRepository.save(candidate);
    }

    @Override
    public Candidate removeSkillFromCandidate(Long candidateId, Long skillId) {
        Candidate candidate = candidateRepository.findById(candidateId)
                .orElseThrow(() -> new ResourceNotFoundException("Candidate not found with id: " + candidateId));
        Skill skill = skillRepository.findById(skillId)
                .orElseThrow(() -> new ResourceNotFoundException("Skill not found with id: " + skillId));
        candidate.getSkills().remove(skill);
        return candidateRepository.save(candidate);
    }

    @Override
    public List<Candidate> searchByName(String name) {
        return searchByNameStrategy.search(name);
    }

    @Override
    public List<Candidate> searchBySkill(String skillName) {
        return searchBySkillStrategy.search(skillName);
    }

    @Override
    public List<Candidate> getAllCandidates() {
        return candidateRepository.findAll();
    }

    @Override
    public Candidate getCandidateById(Long id) {
        return candidateRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Candidate not found with id: " + id));
    }

	@Override
	public List<Candidate> searchByEmail(String email) {
		// TODO Auto-generated method stub
	    return candidateRepository.findByEmailIgnoreCase(email);
	}
}
