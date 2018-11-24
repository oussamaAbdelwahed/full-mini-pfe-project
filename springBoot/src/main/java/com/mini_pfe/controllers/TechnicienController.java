package com.mini_pfe.controllers;

import com.mini_pfe.dao.jobs.TechnicienJob;

import com.mini_pfe.entities.Technicien;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin("*")
public class TechnicienController {
    @Autowired
    private TechnicienJob technicienService;

    @GetMapping(value = "/admin/techniciens/byjobtype")
    public ResponseEntity<Map<String, List<Technicien>>> groupTechsByWorkType() {
        return new ResponseEntity<>(this.technicienService.groupTechsByWorkType(), HttpStatus.OK);
    }
}
