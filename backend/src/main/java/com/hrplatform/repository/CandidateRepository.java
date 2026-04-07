package com.hrplatform.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hrplatform.model.Candidate;

@Repository
public interface CandidateRepository extends JpaRepository<Candidate, Long> {

    //1
	List<Candidate> findByFirstNameContainingIgnoreCase(String firstName);

	//2
    List<Candidate> findByLastNameContainingIgnoreCase(String lastName);

    //3
    List<Candidate> findByFullNameContainingIgnoreCase(String fullName);

    //4
    List<Candidate> findBySkillsName(String skillName);
    
    //5
    List<Candidate> findByEmailIgnoreCase(String email);

}