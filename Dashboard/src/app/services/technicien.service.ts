import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Subject } from 'rxjs';
import { API_BASE_URL } from '../commons/common';

@Injectable()
export class TechnicienService {
    private groupedTechs: any = null;
    public techsSub: Subject<any> = new Subject<any>();
    constructor(private httpClient: HttpClient) {}
    
    public getGroupedTechsByWorkType() {
        this.httpClient.get(API_BASE_URL + "/admin/techniciens/byjobtype").subscribe(
            (data: any) => {
                this.groupedTechs = data;
                this.emitTechsSub();
            }, (errorRep: HttpErrorResponse) => {
                console.log("error");
            }
        )
    }

    public affectTechnicienToReclamation(affectation: any) {
      return new Promise<Boolean>((resolve, reject) => {
          this.httpClient.post(API_BASE_URL + "/admin/interventions/affect", affectation).subscribe(
           (success) => {
              resolve(true);
           }, (error) => {
               resolve(false);
           }
          );
      });
        
    
    }

    emitTechsSub() {
        this.techsSub.next(this.groupedTechs);
    }
}