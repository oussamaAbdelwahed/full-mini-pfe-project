package com.mini_pfe.dao.jobs;

import com.mini_pfe.dao.repositories.DepartementsRepository;
import com.mini_pfe.entities.Departement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DepartementJob {
    @Autowired
    private DepartementsRepository depRepository;

    public List<Departement> getAll() {
        return  this.depRepository.findAll();
    }
}

