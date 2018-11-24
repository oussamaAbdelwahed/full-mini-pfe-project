import { User } from './user.model';
import { Departement } from 'src/app/models/departement.model';
import { Reclamation } from './reclamation.model';
export class ChefDepartement extends User {
    constructor(
         nom: string,
         prenom: string,
         email: string,
         cin: number,
         private departement: Departement,
         private reclamations: Reclamation[],
         id?: number,
    ) {
        super(nom,prenom,email,cin,id);
    }
}