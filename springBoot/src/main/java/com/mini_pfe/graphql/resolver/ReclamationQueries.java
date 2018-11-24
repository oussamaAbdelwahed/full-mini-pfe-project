package com.mini_pfe.graphql.resolver;

import com.coxautodev.graphql.tools.GraphQLQueryResolver;
import com.mini_pfe.dao.repositories.ReclamationsRepository;
import com.mini_pfe.entities.Reclamation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
@Component
public class ReclamationQueries implements GraphQLQueryResolver{
    @Autowired
    private ReclamationsRepository reclamationsRepository;

    public List<Reclamation> getNewReclamations() {
        return this.reclamationsRepository.getNonTreatedReclamations();
    }
}
