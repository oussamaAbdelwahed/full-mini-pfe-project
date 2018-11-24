package com.mini_pfe.graphql.resolver;

import com.coxautodev.graphql.tools.GraphQLQueryResolver;
import com.mini_pfe.dao.repositories.DepartementsRepository;
import com.mini_pfe.entities.Departement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DepartementQueries implements GraphQLQueryResolver{
    @Autowired
    private DepartementsRepository departementsRepository;

    public Departement getDepartementById(Long id) {
        return this.departementsRepository.findById(id).get();
    }

    public List<Departement> getAllDepartements() {
        return this.departementsRepository.findAll();
    }
}

