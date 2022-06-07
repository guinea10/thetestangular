import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Validation } from 'src/app/shared/helper/validation/validation';
import { Product } from 'src/app/shared/models/product';

@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.scss']
})
export class AddEditProductComponent implements OnInit {
  values: Product | null = null;
  portada = 'Adicionar Producto';
  formGroup!: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<AddEditProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product | null,
    private formBuilder: FormBuilder
  ) {
    this.values = data;
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.portada = !!this.values ? 'Editar Productos' : 'Adicionar Productos';
    this.formGroup = this.formBuilder.group({
      idProducto: [this.values ? this.values.idProducto : null],
      nombre: [
        this.values ? this.values.nombre : '',
        Validators.required,
      ],
      precio: [
        this.values ? this.values.precio : '',
        [Validators.required, Validation.isNumberDecimal],
      ],
    });
  }

  save() {
    const valuesForm = this.formGroup.value;
    if (this.formGroup.errors === null) {
      if (!!this.values) {
        this.dialogRef.close(valuesForm);
      } else {
        this.dialogRef.close(valuesForm);
      }
    }
  }

  close() {
    this.dialogRef.close();
  }
  get f(): { [key: string]: AbstractControl } {
    return this.formGroup.controls;
  }
}
