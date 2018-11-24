package com.mini_pfe.controllers;


import com.mini_pfe.dao.jobs.ClasseJob;
import com.mini_pfe.entities.Classe;
import net.bytebuddy.asm.Advice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin("*")
@RestController
public class ClassroomController {
    @Autowired
    private ClasseJob classService;

    @GetMapping(value = "/admin/classes/{depId}")
    public ResponseEntity<List<Classe>> getAllByDep(@PathVariable("depId") Long depId) {
        return new ResponseEntity<List<Classe>>(this.classService.getAllByDepartement(depId), HttpStatus.OK);
    }
}
