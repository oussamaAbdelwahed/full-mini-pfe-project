package com.mini_pfe.controllers;

import com.mini_pfe.dao.jobs.MaterielJob;
import com.mini_pfe.entities.Classe;
import com.mini_pfe.entities.Materiel;
import com.mini_pfe.entities.enums.Categorie;
//import com.mini_pfe.services.GraphQlService;
import graphql.ExecutionResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin("*")
public class MaterielController {

    @Autowired
    private MaterielJob materielJob;

    @PostMapping(value = "/materiels/save")
    public ResponseEntity<Void> saveMaterial(@RequestBody Map<String,String> materiel) {
        Materiel mat = new Materiel();
        mat.setNumSerie(materiel.get("numSerie"));
        mat.setNom(materiel.get("nom"));
        mat.setMarque(materiel.get("marque"));
        mat.setCategorie(Categorie.valueOf(materiel.get("categorie")));
        mat.setAdresseIp(materiel.get("adresseIp"));
        try {
            SimpleDateFormat sdf = new SimpleDateFormat("yyy-MM-dd");
            Date d = sdf.parse(materiel.get("dateAchat"));
            mat.setDateAchat(d);
        }catch (ParseException e) {
            e.printStackTrace();
        }
        Classe c=null;
        if(materiel.get("classe").length() > 0) {
            c = new Classe();
            c.setId(Long.valueOf(materiel.get("classe")));
        }
        mat.setClasse(c);

        this.materielJob.saveMateriel(mat);
        return new ResponseEntity<Void>(HttpStatus.OK);
    }



    @PostMapping(value = "/materiels/{id}/update")
    public ResponseEntity<Void> updateMaterial(@PathVariable("id") Long id, @RequestBody Map<String,String> materiel) {
        try{
            Materiel m = new Materiel();
            m.setAdresseIp(materiel.get("adresseIp"));
            m.setId(id);
            m.setCategorie(Categorie.valueOf(materiel.get("categorie")));
            m.setNom(materiel.get("nom"));
            m.setNumSerie(materiel.get("numSerie"));
            m.setMarque(materiel.get("marque"));
            this.materielJob.updateMaterial(m,Long.valueOf(materiel.get("classe")));
            return new ResponseEntity<Void>(HttpStatus.OK);
        }catch(Exception e) {
            return  new ResponseEntity<Void>(HttpStatus.BAD_REQUEST);
        }
    }
   /*END OUSSAMA METHODS*/
}
