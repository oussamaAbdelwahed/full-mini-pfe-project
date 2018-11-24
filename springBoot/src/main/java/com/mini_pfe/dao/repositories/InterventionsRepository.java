package com.mini_pfe.dao.repositories;


import com.mini_pfe.entities.Intervention;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InterventionsRepository extends JpaRepository<Intervention, Long>{
}
