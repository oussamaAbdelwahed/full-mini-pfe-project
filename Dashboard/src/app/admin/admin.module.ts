import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { EditMaterialComponent } from './materials/edit-material/edit-material.component';
import { DeleteMaterialComponent } from './materials/delete-material/delete-material.component';
import { SharedModule } from '../shared/shared-module.module';
import { ListMaterialsComponent } from './materials/list-materials/list-materials.component';
import { CreateMaterialComponent } from './materials/create-material/create-material.component';
import { ListNewReclamationsComponent } from './reclamations/list-new-reclamations/list-new-reclamations.component';
import { AffecterTechnicienComponent } from './interventions/affecter-technicien/affecter-technicien.component';

@NgModule({
  imports: [CommonModule, AdminRoutingModule, SharedModule],
  declarations: [
    EditMaterialComponent,
    DeleteMaterialComponent,
    ListMaterialsComponent,
    CreateMaterialComponent,
    ListNewReclamationsComponent,
    AffecterTechnicienComponent,

  ]
})

export class AdminModule {
  constructor() {
    console.log("***Lazy Loaded AdminModule***");
  }
}