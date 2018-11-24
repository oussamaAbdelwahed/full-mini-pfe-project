import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavbarModule } from './navbar/navbar.module';
import { SidebarModule } from '../sidebar/sidebar.module';

@NgModule({
  imports: [CommonModule],
  exports: [ReactiveFormsModule, FormsModule, NavbarModule, SidebarModule],
  providers : [],
  declarations: []
})

export class SharedModule {

}