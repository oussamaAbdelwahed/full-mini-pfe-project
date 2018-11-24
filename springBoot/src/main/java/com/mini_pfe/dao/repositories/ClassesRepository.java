package com.mini_pfe.dao.repositories;

import com.mini_pfe.entities.Classe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClassesRepository extends JpaRepository<Classe,Long> {
    List<Classe> findByDepartementId(Long depId);
}
