import { Component, Inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Validation } from 'src/app/shared/helper/validation/validation';
import { Client } from 'src/app/shared/models/client';
import { ClientService } from '../services/client.service';

@Component({
  selector: 'app-add-edit-client',
  templateUrl: './add-edit-client.component.html',
  styleUrls: ['./add-edit-client.component.scss'],
})
export class AddEditClientComponent implements OnInit {
  edit = false;
  values: Client | null = null;
  portada = 'Adicionar Cliente';
  formGroup!: FormGroup;
  constructor(
    private dialogRef: MatDialogRef<AddEditClientComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Client | null,
    private formBuilder: FormBuilder,
    private clientService: ClientService
  ) {
    this.values = data;
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.portada = !!this.values ? 'Editar Cliente' : 'Adicionar Cliente';
    if (!!this.values) this.edit = true;
    this.formGroup = this.formBuilder.group({
      idCliente: [this.values ? this.values.idCliente : ''],
      nombre: [this.values ? this.values.nombre : '', Validators.required],
      apellido: [this.values ? this.values.apellido : '', Validators.required],
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
        this.clientService
          .updateClient(valuesForm)
          .pipe(
            map(() => this.dialogRef.close('adicionar')),
            catchError(() => {
              return of(null);
            })
          )
          .subscribe();
      } else {
        this.clientService
          .getClient()
          .pipe(
            switchMap((values: Client[]) => {
              valuesForm.id = values.length + 1;
              valuesForm.idCliente = values.length + 1;
              return this.clientService.postClient(valuesForm).pipe(
                map(() => this.dialogRef.close('editar')),
                catchError(() => {
                  return of(null);
                })
              );
            }),
            catchError(() => {
              return of(null);
            })
          )
          .subscribe();
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
