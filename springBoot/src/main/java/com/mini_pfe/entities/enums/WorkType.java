package com.mini_pfe.entities.enums;

public enum WorkType {
     TECHNI_RES("TECHNI_RES"),
     TECHNI_HRDW("TECHNI_HRDW");

    private String type;
    private WorkType(String t) {
        this.type = t;
    }
}
