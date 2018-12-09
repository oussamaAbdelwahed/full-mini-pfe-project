import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Subject } from 'rxjs';
import { API_BASE_URL } from '../commons/common';

@Injectable()
export class StatisticsService {
   public  subjectPerCat: Subject<any[]> = new Subject<any[]>();
   public subjectPerMar: Subject<any[]> = new Subject<any[]>();
   private dataCat: any[] = [];
   private dataMar: any[] = [];

   constructor(private httpClient: HttpClient) {}

    getNbrMaterialsByCategorie(query: string) {
        this.httpClient.post(API_BASE_URL + '/graphql',query).subscribe(
          (response: any) => {
              this.dataCat = response["data"]["getNbrMaterialsByCategorie"];
              this.emitByCategorieSubject();
          }, (error: HttpErrorResponse) => {}
        );
    }

    getNbrMaterialsByMarque(query: string) {
        this.httpClient.post(API_BASE_URL + '/graphql', query).subscribe(
            (response: any) => {
                this.dataMar = response["data"]["getNbrMaterialsByMarque"];
                this.emitByMarqueSubject();
            }, (error: HttpErrorResponse) => { }
        );
    }

   emitByCategorieSubject() {
       this.subjectPerCat.next(this.dataCat.slice());
   }

    emitByMarqueSubject() {
        this.subjectPerMar.next(this.dataMar.slice());
    }
   
}