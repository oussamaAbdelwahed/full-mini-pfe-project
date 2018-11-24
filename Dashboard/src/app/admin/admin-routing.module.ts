import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditMaterialComponent } from './materials/edit-material/edit-material.component';
import { ListMaterialsComponent } from './materials/list-materials/list-materials.component';
import { CreateMaterialComponent } from './materials/create-material/create-material.component';
import { ListNewReclamationsComponent } from './reclamations/list-new-reclamations/list-new-reclamations.component';
import { AffecterTechnicienComponent } from './interventions/affecter-technicien/affecter-technicien.component';

const routes: Routes = [
  {
    path: "materials/:id/edit",
    component: EditMaterialComponent
  },
  {
    path: "materials/list",
    component: ListMaterialsComponent
  },
  {
    path: "materials/create",
    component: CreateMaterialComponent
  },
  {
    path: "materials/reclamations",
    component: ListNewReclamationsComponent
  },
  {
    path: "materials/reclamations/:id/affecter-technicien",
    component: AffecterTechnicienComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
