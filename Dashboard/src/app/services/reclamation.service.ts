import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, Subject } from 'rxjs';
import { Reclamation } from '../models/reclamation.model';
import { API_BASE_URL } from '../commons/common';


@Injectable({
  providedIn: 'root'
})
export class ReclamationService {
  private httpClient: HttpClient;
  private reclamations: Reclamation[] = [];
  public reclamationsSub : Subject<Reclamation[]> = new Subject<Reclamation[]>();
  constructor(private _http: HttpClient) { 
    this.httpClient = _http;
  }

  public addReclamation(info1,info2): Observable<any>{
    let object = {
      objectif: info1.objectif,
      description: info1.description,
      date_creation: new Date(),
      chef_dep_id: 1,
      mat_id: info2.id
    }
    return this._http.post("http://localhost:8080/api/chefDep/add_reclamation",object);
  }

  public getNewReclamations(query: string) {
    this.httpClient.post(API_BASE_URL + "/graphql", query).subscribe(
       (emittedData) => {
         this.reclamations = emittedData["data"]["getNewReclamations"];
         this.emitReclamationsSub();
       }
    );
  }

  private emitReclamationsSub() {
    this.reclamationsSub.next(this.reclamations.slice());
  }
}
