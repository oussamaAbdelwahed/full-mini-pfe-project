package com.mini_pfe.dao.repositories;

import com.mini_pfe.entities.Departement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DepartementsRepository extends JpaRepository<Departement, Long> {

}
