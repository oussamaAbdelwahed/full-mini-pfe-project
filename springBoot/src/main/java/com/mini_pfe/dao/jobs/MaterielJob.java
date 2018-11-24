package com.mini_pfe.dao.jobs;

import com.mini_pfe.dao.repositories.MaterielsRepository;
import com.mini_pfe.entities.Materiel;
//import com.mini_pfe.services.GraphQlService;
import graphql.ExecutionResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MaterielJob {
    @Autowired
    private MaterielsRepository materielRepository;
    /*
    required for old graphql work@Autowired
    GraphQlService graphQlService;

    public ExecutionResult getAllMaterielsByChefDepart(String query) {
       ExecutionResult execute = this.graphQlService.getGraphQL().execute(query);
        return execute;
    }*/


    //new for replacing old
    public List<Materiel> getAllMaterielsByChefDepart(Long chefId) {
        return  this.materielRepository.findMaterielsByChefDepart(chefId);
    }

    //end new

    /*BEGIN OUSSAMA WORK*/


    /*public Materiel findMaterielById(Long id) {
        Optional<Materiel> opt = this.materielRepository.findById(id);
        if(opt.isPresent())
            return  opt.get();
        return  null;
    }*/

    public boolean saveMateriel(Materiel m) {
        try {
            this.materielRepository.save(m);
            return true;
        }catch (Exception e) {
            e.printStackTrace();
            return true;
        }
    }

    public boolean updateMaterial(Materiel m,Long classId) {
        try {
            this.materielRepository.updateMaterial(m.getAdresseIp(), m.getCategorie(), m.getMarque(), m.getNom(), m.getNumSerie(),classId, m.getId());
        }catch (Exception e) {
            e.printStackTrace();
            return false;
        }
        return true;
    }
     /*END OUSSAMA WORK*/
}
