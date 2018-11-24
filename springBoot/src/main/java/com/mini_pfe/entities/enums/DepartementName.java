package com.mini_pfe.entities.enums;

public enum DepartementName {
    DEPARTEMENT_INFO("DEPARTEMENT_INFO"),
    DEPARTEMENT_ECO("DEPARTEMENT_ECO"),
    DEPARTEMENT_GENI_MECA("DEPARTEMENT_GENI_MECA"),
    DEPARTEMENT_GENI_ELEC("DEPARTEMENT_GENI_ELEC"),
    DEPARTEMENT_AGRO_ALI("DEPARTEMENT_AGRO_ALI"),
    DEPARTEMENT_GENI_CIV("DEPARTEMENT_GENI_CIV");

    private String name;
    private DepartementName(String n) {
        this.name = n;
    }
}
