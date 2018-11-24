import { Materiel } from "./material.model";
import { ChefDepartement } from "./chefDepartement.model";
import { Intervention } from "./intervention.model";

export class Reclamation {
    constructor(
        private dateCreation: string,
        private materiel: Materiel,
        private chefDepartement: ChefDepartement,
        private interventions: Intervention,
        private description: string,
        private objectif?: string,
        private id?: number
    ) {}
}