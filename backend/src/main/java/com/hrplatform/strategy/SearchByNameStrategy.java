package com.hrplatform.strategy;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.hrplatform.model.Candidate;
import com.hrplatform.repository.CandidateRepository;

@Component
public class SearchByNameStrategy implements SearchStrategy {

    @Autowired
    private CandidateRepository candidateRepository;

    @Override
    public List<Candidate> search(String keyword) {
        List<Candidate> result = new ArrayList<>();

        // Pretraga po imenu
        result.addAll(candidateRepository.findByFirstNameContainingIgnoreCase(keyword));

        // Pretraga po prezimenu
        result.addAll(candidateRepository.findByLastNameContainingIgnoreCase(keyword));

        // Pretraga po punom imenu
        result.addAll(candidateRepository.findByFullNameContainingIgnoreCase(keyword));

        //return result;
        return result.stream().distinct().toList();
    }
}