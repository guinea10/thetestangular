import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListProductComponent } from './list-product/list-product.component';
import { AddEditProductComponent } from './add-edit-product/add-edit-product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [ListProductComponent, AddEditProductComponent],
  entryComponents: [AddEditProductComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  exports: [
    ListProductComponent
  ]
})
export class ProductModule { }
