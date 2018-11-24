package com.mini_pfe.controllers;


import com.mini_pfe.dao.repositories.InterventionsRepository;
import com.mini_pfe.entities.Intervention;
import com.mini_pfe.entities.Reclamation;
import com.mini_pfe.entities.Technicien;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;

@RestController
@CrossOrigin("*")
public class InterventionController {
    @Autowired
    private InterventionsRepository interventionsRepository;

    @PostMapping(value = "/admin/interventions/affect")
    public ResponseEntity<Void> affectTechnicien(@RequestBody Map<String, String> data) {
        Intervention intervention = new Intervention();;
        Technicien technicien=null;
        Reclamation reclamation=null;
        try {
            SimpleDateFormat sdf = new SimpleDateFormat("yyy-MM-dd");
            Date d = sdf.parse(data.get("dateExecution"));
            intervention.setDateExecution(d);
            Long techId = Long.valueOf(data.get("technicien"));
            technicien = new Technicien();
            technicien.setId(techId);
            Long recId = Long.valueOf(data.get("reclamation"));
            reclamation = new Reclamation();
            reclamation.setId(recId);
            intervention.setTechnicien(technicien);
            intervention.setReclamation(reclamation);
            intervention.setResultat(false);
            this.interventionsRepository.save(intervention);
        }catch (ParseException | NumberFormatException e) {
            e.printStackTrace();
            return new ResponseEntity<Void>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return  new ResponseEntity<Void>(HttpStatus.OK);
    }

}
