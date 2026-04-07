package com.hrplatform.service;

import java.util.List;

import com.hrplatform.model.Candidate;

public interface CandidateService {

    Candidate addCandidate(Candidate candidate);

    Candidate updateCandidate(Long id, Candidate candidate);

    void deleteCandidate(Long id);

    Candidate addSkillToCandidate(Long candidateId, Long skillId);

    Candidate removeSkillFromCandidate(Long candidateId, Long skillId);

    List<Candidate> searchByName(String name);

    List<Candidate> searchBySkill(String skillName);
    
    List<Candidate> searchByEmail(String email);

    List<Candidate> getAllCandidates();

    Candidate getCandidateById(Long id);

}