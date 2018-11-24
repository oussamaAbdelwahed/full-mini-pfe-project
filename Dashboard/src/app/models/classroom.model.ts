import { Departement } from "./departement.model";
import { Materiel } from "./material.model";

export class Classroom {
    constructor(
        public nom: string, public departement?: Departement,
        public id?: number, public materiels?: Array<Materiel>
    ) { }
}