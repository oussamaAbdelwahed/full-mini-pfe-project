import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { SidebarModule } from './sidebar/sidebar.module';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule} from './shared/navbar/navbar.module';
import { FixedPluginModule} from './shared/fixedplugin/fixedplugin.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import { HttpClientModule, HttpClient } from '@angular/common/http'
import {MatSnackBarModule} from '@angular/material/snack-bar';

// import { NguiMapModule} from '@ngui/map';

import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';
import { TableComponent } from './table/table.component';
import { TypographyComponent } from './typography/typography.component';
import { IconsComponent } from './icons/icons.component';
import { MapsComponent } from './maps/maps.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { UpgradeComponent } from './upgrade/upgrade.component';


// components
import { ListProductsComponent } from './list-products/list-products.component';
import { ReclamationComponent } from './reclamation/reclamation.component';
import { ModalAffectTechnicienComponent } from './modal-affect-technicien/modal-affect-technicien.component';
import { LoginComponent } from './login/login.component';
import { TemplateComponent } from './template/template.component';
import { AddReclamationComponent } from './add-reclamation/add-reclamation.component';
import { ModalListMaterielParCheDepComponent } from './modal-list-materiel-par-che-dep/modal-list-materiel-par-che-dep.component';
import { SnackBarAddReclamationComponent } from './snack-bar-add-reclamation/snack-bar-add-reclamation.component';

// services
import { MaterielService } from './services/materiel.service';
import { ClassroomService } from './services/classroom.service';

import { DepartementService } from './services/departement.service';

import { SharedModule } from './shared/shared-module.module';
import { ReclamationService } from './services/reclamation.service';
import { TechnicienService } from './services/technicien.service';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    UserComponent,
    TableComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    UpgradeComponent,
    ListProductsComponent,
    ReclamationComponent,
    ModalAffectTechnicienComponent,
    LoginComponent,
    TemplateComponent,
    AddReclamationComponent,
    ModalListMaterielParCheDepComponent,
    SnackBarAddReclamationComponent
  ],
  imports: [
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MatDialogModule,
    MatCardModule,
    BrowserModule,
    AppRoutingModule,
    /*SidebarModule,
    NavbarModule,*/
    FooterModule,
    FixedPluginModule,
    ReactiveFormsModule,
    SharedModule,
    MatSnackBarModule
   // NguiMapModule.forRoot({apiUrl: 'https://maps.google.com/maps/api/js?key=YOUR_KEY_HERE'})

  ],
  providers: [MaterielService,
    ClassroomService,
    DepartementService,
    ReclamationService,
    TechnicienService,
    HttpClient],
  bootstrap: [AppComponent],
  entryComponents: [
    ModalAffectTechnicienComponent,
    ModalListMaterielParCheDepComponent,
    SnackBarAddReclamationComponent
  ]
})
export class AppModule { }
