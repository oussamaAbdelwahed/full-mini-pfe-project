package com.mini_pfe.controllers;

import com.mini_pfe.dao.jobs.DepartementJob;
import com.mini_pfe.entities.Departement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin("*")
@RestController
public class DepartementController {
    @Autowired
    private DepartementJob depSevice;

    @GetMapping(value = "/admin/departements")
    public ResponseEntity<List<Departement>> getAll() {
        return new ResponseEntity<List<Departement>>(this.depSevice.getAll(), HttpStatus.OK);
    }
}
