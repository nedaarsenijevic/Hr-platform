package com.hrplatform.strategy;

import java.util.List;

import com.hrplatform.model.Candidate;

public interface SearchStrategy {

    List<Candidate> search(String keyword);

}