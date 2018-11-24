package com.mini_pfe.dao.repositories;

import com.mini_pfe.entities.Technicien;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface TechniciensRepository extends JpaRepository<Technicien , Long> {

}
