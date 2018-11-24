import { DepartementName } from '../commons/common';
import { Classroom } from './classroom.model';

export class Departement {
    constructor(
        public nom: DepartementName, public chef?: any,
        public id?: number, public classes?:Array<Classroom>
    ) {}
}