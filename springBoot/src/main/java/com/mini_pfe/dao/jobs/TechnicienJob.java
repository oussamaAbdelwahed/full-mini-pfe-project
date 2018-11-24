package com.mini_pfe.dao.jobs;


import java.util.Map;

import com.mini_pfe.dao.repositories.TechniciensRepository;
import com.mini_pfe.entities.Technicien;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TechnicienJob {
    @Autowired
    private TechniciensRepository techniciensRepository;


    public Map<String, List<Technicien>> groupTechsByWorkType() {
       Map<String,List<Technicien>> group = this.techniciensRepository.findAll().stream().collect(
          Collectors.groupingByConcurrent((technicien) -> {
            return technicien.getTypeTravail().toString();
          })
       );
       return group;
    }
}
