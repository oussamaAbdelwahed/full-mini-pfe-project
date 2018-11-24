
import { Reclamation } from './reclamation.model';
import { Technicien } from './technicien.model';
export class Intervention {
    constructor(
        private dateExecution: string,
        private resultat: boolean,
        private reclamation: Reclamation,
        private technicien?: Technicien,
        private id?: number
    ) {}
}