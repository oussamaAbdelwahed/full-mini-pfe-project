package com.mini_pfe.entities;


import com.fasterxml.jackson.annotation.*;

import javax.persistence.*;
import java.util.Collection;
import java.util.LinkedList;

@Entity
@Table(name = "CLASSES")
public class Classe {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="CLASS_ID")
    private Long id;

    @Column(name = "NOM",nullable = false)
    private String nom;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }


    public Collection<Materiel> getMateriels() {
        return materiels;
    }


    public void setMateriels(Collection<Materiel> materiels) {
        this.materiels = materiels;
    }

    public Departement getDepartement() {
        return departement;
    }

    public void setDepartement(Departement departement) {
        this.departement = departement;
    }


    @JsonBackReference(value = "materiel-classe1")
    @OneToMany(mappedBy = "classe")
    private Collection<Materiel> materiels = new LinkedList<>();

    @ManyToOne
    @JoinColumn(name = "DEP_ID")
    @JsonManagedReference(value = "classe-departement")
    private Departement departement;

    public Classe() {}
}
