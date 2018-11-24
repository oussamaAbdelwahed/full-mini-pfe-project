package com.mini_pfe.dao.repositories;

import com.mini_pfe.entities.Reclamation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReclamationsRepository extends JpaRepository<Reclamation,Long>{
    List<Reclamation> findByMaterielId(Long matId);
    List<Reclamation> findByInterventionsResultat(boolean resultat);
    //

    @Query(value = "SELECT r FROM Reclamation r JOIN FETCH r.materiel m JOIN FETCH r.chefDepartement ch LEFT JOIN r.interventions i WHERE i.id IS NULL ORDER BY r.dateCreation DESC")
    List<Reclamation> getNonTreatedReclamations();
}
