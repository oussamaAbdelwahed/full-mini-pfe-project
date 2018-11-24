import { User } from './user.model';
import { WorkType } from '../commons/common';
import { Intervention } from './intervention.model';
export class Technicien extends User {
     constructor(
          nom: string,
          prenom: string,
          email: string,
          cin: number,
          private typeTravail: WorkType,
          private interventions: Intervention[],
          id?: number
     ) {
         super(nom,prenom,email,cin,id);
     }
}