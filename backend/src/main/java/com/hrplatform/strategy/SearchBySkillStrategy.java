package com.hrplatform.strategy;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.hrplatform.model.Candidate;
import com.hrplatform.repository.CandidateRepository;

@Component
public class SearchBySkillStrategy implements SearchStrategy {

    @Autowired
    private CandidateRepository candidateRepository;

    @Override
    public List<Candidate> search(String keyword) {
        return candidateRepository.findBySkillsName(keyword);
    }
}