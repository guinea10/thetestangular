import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Validation } from 'src/app/shared/helper/validation/validation';
import { Client } from 'src/app/shared/models/client';

@Component({
  selector: 'app-add-edit-client',
  templateUrl: './add-edit-client.component.html',
  styleUrls: ['./add-edit-client.component.scss']
})
export class AddEditClientComponent implements OnInit {
  values: Client | null = null;
  portada = 'Adicionar Cliente';
  formGroup!: FormGroup;
  constructor(
    private dialogRef: MatDialogRef<AddEditClientComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Client | null,
    private formBuilder: FormBuilder
  ) {
    this.values = data;
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.portada = !!this.values ? 'Editar Cliente' : 'Adicionar Cliente';
    this.formGroup = this.formBuilder.group({
      idCliente: [this.values ? this.values.idCliente : null],
      nombre: [
        this.values ? this.values.nombre : '',
        Validators.required,
      ],
      apellido: [
        this.values ? this.values.apellido : '',
        Validators.required,
      ],
      dni: [
        this.values ? this.values.dni : '',
        [Validators.required, Validation.isNumberInteager],
      ],
      telefono: [
        this.values ? this.values.telefono : '',
        [Validators.required, Validation.isNumberInteager],
      ],
      email: [
        this.values ? this.values.email : '',
        [Validators.required, Validators.email],
      ],
    });
  }

  save() {
    const valuesForm = this.formGroup.value;
    if (this.formGroup.errors === null) {
      if (!!this.values) {
        console.log('Aqui va el editar', valuesForm);
        this.dialogRef.close(valuesForm);
      } else {
        console.log('Aqui va el adicionar', valuesForm);
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