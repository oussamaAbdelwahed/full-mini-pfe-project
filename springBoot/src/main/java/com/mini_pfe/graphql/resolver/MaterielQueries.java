package com.mini_pfe.graphql.resolver;

import com.coxautodev.graphql.tools.GraphQLQueryResolver;
import com.mini_pfe.dao.jobs.MaterielJob;
import com.mini_pfe.dao.repositories.MaterielsRepository;
import com.mini_pfe.entities.Materiel;
import com.mini_pfe.entities.enums.Categorie;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class MaterielQueries implements GraphQLQueryResolver {
    @Autowired
    private MaterielsRepository materielsRepository;

    @Autowired
    private MaterielJob materielJob;


    public List<Materiel> AllMaterielsByChefDepart(Long chefDepartId) {
        return  this.materielsRepository.findMaterielsByChefDepart(chefDepartId);
    }

    public List<Materiel> getMaterialsByDepartement(Long departementId) {
        return  this.materielsRepository.findByClasseDepartementId(departementId);
    }

    public List<Materiel> getMaterialsByClassroom(Long classroomId) {
        return this.materielsRepository.findByClasseId(classroomId);
    }


    public List<Materiel> getMaterialsByCategorie(String categ) {

            Categorie categorie = Categorie.valueOf(categ);
            return this.materielsRepository.findByCategorie(categorie);

    }

    public List<Materiel> getMaterialsByDepartementAndCategorie(Long depId, String categ) {
      Categorie categorie = Categorie.valueOf(categ);
      return this.materielsRepository.findByClasseDepartementIdAndCategorie(depId,categorie);
    }


    public List<Materiel> getMaterialsByClasseAndCategorie(Long classId, String categ) {
        Categorie categorie = Categorie.valueOf(categ);
        return  this.materielsRepository.findByClasseIdAndCategorie(classId,categorie);
    }


    public Materiel getMaterialById(Long matId) {
        return this.materielsRepository.findById(matId).get();
    }

    public List<Materiel> getAllMaterials() {
        return this.materielsRepository.findAll();
    }

    public boolean deleteMateriel(Long matId) {
        try{
             this.materielsRepository.deleteById(matId);
             return true;
        }catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
}
