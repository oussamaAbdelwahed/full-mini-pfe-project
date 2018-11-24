package com.mini_pfe.entities;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.mini_pfe.entities.enums.Categorie;

import javax.persistence.*;
import java.util.Collection;
import java.util.Date;
import java.util.LinkedList;

@Entity
@Table(name="MATERIELS")
@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id")
public class Materiel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="MAT_ID")
    private Long id;

    @Column(name="NUM_SERIE",unique = true,nullable = false)
    private String numSerie;

    @Column(name="NOM")
    private String nom;

    @Column(name="MARQUE")
    private String marque;

    @Column(name = "CATEGORIE")
    @Enumerated(EnumType.STRING)
    private Categorie categorie;


    @Column(name="ADRESSE_IP")
    private String adresseIp;

    @Temporal(value = TemporalType.DATE)
    @Column(name = "DATE_ACHAT")
    private Date dateAchat;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="CLASS_ID")
    @JsonManagedReference(value = "materiel-classe")
    private Classe classe;


    @OneToMany(mappedBy = "materiel",fetch = FetchType.LAZY)
    @JsonBackReference(value = "materiel-reclamation")
    private Collection<Reclamation> reclamations = new LinkedList<>();


    public Collection<Reclamation> getReclamations() {
        return reclamations;
    }

    public void setReclamations(Collection<Reclamation> reclamations) {
        this.reclamations = reclamations;
    }

    public Classe getClasse() {
        return classe;
    }

    public void setClasse(Classe classe) {
        this.classe = classe;
    }





    public Materiel() {}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNumSerie() {
        return numSerie;
    }

    public void setNumSerie(String numSerie) {
        this.numSerie = numSerie;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getMarque() {
        return marque;
    }

    public void setMarque(String marque) {
        this.marque = marque;
    }

    public Categorie getCategorie() {
        return categorie;
    }

    public void setCategorie(Categorie categorie) {
        this.categorie = categorie;
    }

    public String getAdresseIp() {
        return adresseIp;
    }

    public void setAdresseIp(String adresseIp) {
        this.adresseIp = adresseIp;
    }

    public Date getDateAchat() {
        return dateAchat;
    }

    public void setDateAchat(Date dateAchat) {
        this.dateAchat = dateAchat;
    }
}
