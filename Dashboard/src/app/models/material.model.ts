import { Categorie } from '../commons/common';
import { Classroom } from './classroom.model';
export class Materiel {
    constructor(
       public numSerie: string,public nom: string,
       public marque: string, public categorie: Categorie,
       public adresseIp?: string, public dateAchat?: string,
       public id?: number, public classe?: Classroom,
       public reclamations?: Array<any>
    ) {}
}