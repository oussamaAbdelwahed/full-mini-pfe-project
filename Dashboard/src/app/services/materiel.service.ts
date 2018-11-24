import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Observable, Subject } from 'rxjs';
import { Materiel } from '../models/material.model';
import { API_BASE_URL } from '../commons/common';
@Injectable({
  providedIn: 'root'
})
export class MaterielService {
  public singleMatSub: Subject<Materiel> = new Subject<Materiel>();
  public materialsSub:Subject<Materiel[]> = new Subject<Materiel[]>();
  private materials: Materiel[] = [];

  private httpClient;
  constructor(private _http: HttpClient) { 
    this.httpClient = _http;
  }

  public getAllMaterielByChefDep(chefDepId, query): Observable<any> {
    return this._http.post("http://localhost:8080/api/chefDep/materiels",query);
  }
/* oussama work */

  getMaterielById(query: string) {
    this.httpClient.post(API_BASE_URL+"/graphql",query).subscribe(
      (data: any) => {
        this.emitSingleMatSub(data['data']['getMaterialById']);
      }, (errorRep: HttpErrorResponse) => {
        if (errorRep.status === 404) {
          //record not found
        }
      }
    );
  }

  updateMaterial(id: number, material: any): Promise<Boolean> {
    return new Promise<Boolean>((resolve, reject) => {
      this.httpClient.post(API_BASE_URL + "/materiels/" + id + "/update", material).subscribe(
        (successData) => {
          resolve(true);
        }, (errorRep: HttpErrorResponse) => {
          if (errorRep.status != 500 && errorRep.status != 404) resolve(true);
          else resolve(false);
        }
      );
    });
  }

  getMaterialsByDep(query: string) {
    this.httpClient.post(API_BASE_URL + "/graphql", query).subscribe(
      (data: any) => {
        this.materials = data["data"]["getMaterialsByDepartement"];
        this.emitMaterialsSub();
      }, (errorRep: HttpErrorResponse) => {
        if (errorRep.status === 404) {
          //record not found
        }
      }
    );
  }


  getMaterialsByQuery(query: string,invokedQueryName: string) {
    this.httpClient.post(API_BASE_URL + "/graphql", query).subscribe(
      (data: any) => {
        this.materials = data["data"][invokedQueryName];
        this.emitMaterialsSub();
      }, (errorRep: HttpErrorResponse) => {
        if (errorRep.status === 404) {
          //record not found
        }
      }
    );
  }

  getMaterialsByClass(query: string) {
    this.httpClient.post(API_BASE_URL + "/graphql", query).subscribe(
      (data: any) => {
        this.materials = data["data"]["getMaterialsByClassroom"];
        this.emitMaterialsSub();
      }, (errorRep: HttpErrorResponse) => {
        if (errorRep.status === 404) {
          //record not found
        }
      }
    );
  }

  saveMaterial(mat: any) {
    return new Promise<Boolean>((resolve, reject) => {
      this.httpClient.post(API_BASE_URL + "/materiels/save", mat).subscribe(
        (successData) => {
            resolve(true);
        }, (error: HttpErrorResponse) => {
            resolve(false);
        }
      )
    });
  }

  private handleError(erroResponse: HttpErrorResponse) {
    if (erroResponse.error instanceof ErrorEvent) {
      //client side error ( internet connection )
    } else {
      //server side error
    }
  }

  deleteMateriel(query: string) {
    return new Promise<Boolean>((resolve, reject) => {
       this.httpClient.post(API_BASE_URL + "/graphql",query).subscribe(
         (emittedData) => {
            resolve(true);
         }, (error: HttpErrorResponse) => {
            resolve(false);
         }
       );
    });
  }

  private emitSingleMatSub(materiel: Materiel) {
    this.singleMatSub.next(materiel);
  }

  private emitMaterialsSub() {
    this.materialsSub.next(this.materials.slice());
  }

  /*end oussama work */
}
