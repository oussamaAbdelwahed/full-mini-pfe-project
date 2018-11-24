package com.mini_pfe.graphql.resolver;


import com.coxautodev.graphql.tools.GraphQLQueryResolver;
import com.mini_pfe.dao.jobs.ClasseJob;
import com.mini_pfe.dao.repositories.ClassesRepository;
import com.mini_pfe.entities.Classe;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ClasseQueries implements GraphQLQueryResolver{
    @Autowired
    private ClassesRepository classesRepository;
    @Autowired
    private ClasseJob classeJob;


    public List<Classe> getAllClasses() {
        return this.classesRepository.findAll();
    }

    public Classe getClasseById(Long id) {
        return this.classesRepository.findById(id).get();
    }

    public List<Classe> getClassesByDepartement(Long id) {
        return this.classesRepository.findByDepartementId(id);
    }



}
