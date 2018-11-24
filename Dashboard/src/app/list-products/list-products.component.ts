import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MaterielService } from '../services/materiel.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent implements OnInit, OnDestroy {

  public listProducts = []
  private SubcriptionListProducts: Subscription

  constructor(private _router: Router, private _materielService: MaterielService) { }

  ngOnInit() {
    this.fetchMateriels();
  }

  ngOnDestroy(): void {
    this.SubcriptionListProducts.unsubscribe()
  }

  public fetchMateriels() {
    let GraphQlQuery  = '{AllMaterielsByChefDepart(chefDepartId: "1") {nom marque numSerie categorie adresseIp  dateAchat classe {  id nom }} }'
    this.SubcriptionListProducts = this._materielService.getAllMaterielByChefDep(1,GraphQlQuery)
      .subscribe((result) => {
        console.log(result)
        this.listProducts = result.data.AllMaterielsByChefDepart
      })
  }

}
