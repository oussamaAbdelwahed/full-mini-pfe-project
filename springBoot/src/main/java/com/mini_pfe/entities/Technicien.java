package com.mini_pfe.entities;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.mini_pfe.entities.enums.WorkType;

import javax.persistence.*;
import java.util.LinkedList;
import java.util.List;

@Entity
@DiscriminatorValue("TECH")
public class Technicien extends User {
    @Column(name="TYPE_TRAVAIL")
    @Enumerated(EnumType.STRING)
    private WorkType typeTravail;

    @Transient
    private String key;

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    @JsonBackReference(value = "technicien-intervention")
    @OneToMany(mappedBy = "technicien", fetch = FetchType.EAGER)
    private List<Intervention> interventions = new LinkedList<>();;

    public Technicien() {
        this.key="";
    }

    public WorkType getTypeTravail() {
        return typeTravail;
    }

    public List<Intervention> getInterventions() {
        return interventions;
    }

    public void setInterventions(List<Intervention> interventions) {
        this.interventions = interventions;
    }

    public void setTypeTravail(WorkType typeTravail) {
        this.typeTravail = typeTravail;
    }


    @Override
    public String toString() {
        return "Technicien{" +
                "typeTravail=" + typeTravail +
                ", interventions=" + interventions +
                '}';
    }
}
