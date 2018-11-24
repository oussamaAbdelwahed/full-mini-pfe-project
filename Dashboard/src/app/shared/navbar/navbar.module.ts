import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar.component';
import { SharedModule } from '../shared-module.module';

@NgModule({
    imports: [ RouterModule, CommonModule],
    declarations: [ NavbarComponent ],
   exports: [ NavbarComponent ]
})

export class NavbarModule {}
