import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablesComponent } from './components/tables/tables.component';
import { AngularMaterialModule } from '../modules/material/angular-material/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    TablesComponent,
    SidebarComponent,
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  exports: [
    TablesComponent,
    SidebarComponent,
  ],
})
export class SharedModule { }
