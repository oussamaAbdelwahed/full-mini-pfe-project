package com.mini_pfe.graphql.resolver;

import com.coxautodev.graphql.tools.GraphQLQueryResolver;
import com.mini_pfe.dao.repositories.TechniciensRepository;
import com.mini_pfe.entities.Technicien;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.*;

@Component
public class TechnicienQueries  implements GraphQLQueryResolver{
    @Autowired
    private TechniciensRepository techniciensRepository;

    public Map<String, List<Technicien>> getTechniciensGroupedByWorkType() {
             return null;
    }
}
