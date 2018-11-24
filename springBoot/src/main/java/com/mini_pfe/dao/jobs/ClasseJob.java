package com.mini_pfe.dao.jobs;

import com.mini_pfe.dao.repositories.ClassesRepository;
import com.mini_pfe.entities.Classe;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClasseJob {
    @Autowired
    private ClassesRepository classRepo;

    public List<Classe> getAllByDepartement(Long depId) {
        return this.classRepo.findByDepartementId(depId);
    }
}
