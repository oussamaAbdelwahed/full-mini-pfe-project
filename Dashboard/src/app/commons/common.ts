export const API_BASE_URL = 'http://localhost:8080';

export enum DepartementName {
    DEPARTEMENT_INFO = "DEPARTEMENT_INFO",
    DEPARTEMENT_ECO = "DEPARTEMENT_ECO",
    DEPARTEMENT_GENI_MECA = "DEPARTEMENT_GENI_MECA",
    DEPARTEMENT_GENI_ELEC = "DEPARTEMENT_GENI_ELEC",
    DEPARTEMENT_AGRO_ALI = "DEPARTEMENT_ALGRO_ALI",
    DEPARTEMENT_GENI_CIV = "DEPARTEMENT_GENI_CIV"
}

export enum Categorie {
    EQUIPEMENT_RESAU = "EQUIPEMENT_RESAU",
    PC = "PC",
    RETRO_PROJECTEUR = "RETRO_PROJECTEUR"
}

export enum WorkType {
    TECHNI_RES = "TECHNI_RES",
    TECHNI_HRDW = "TECHNI_HRDW"
}

export function formatGraphQLParams(params :any[],query: string) {
    for(let i=0; i<params.length;i++) {
        if (typeof params[i] === 'object' && params[i]!==null) {
            query += params[i]["n"]+ " {";
            query = formatGraphQLParams(params[i]["v"], query)+ " } ";
        }else{
            query+= params[i] + " ";
        }
    }
    return query;
}