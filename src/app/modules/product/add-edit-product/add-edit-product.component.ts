import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { of, Subscription } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Validation } from 'src/app/shared/helper/validation/validation';
import { Product } from 'src/app/shared/models/product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.scss'],
})
export class AddEditProductComponent implements OnInit, OnDestroy {
  subcription: Subscription = new Subscription();
  values: Product | null = null;
  portada = 'Adicionar Producto';
  formGroup!: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<AddEditProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product | null,
    private formBuilder: FormBuilder,
    private productService: ProductService
  ) {
    this.values = data;
  }

  ngOnInit() {
    this.createForm();
  }

  ngOnDestroy(): void {
    this.subcription.unsubscribe();
  }

  createForm() {
    this.portada = !!this.values ? 'Editar Productos' : 'Adicionar Productos';
    this.formGroup = this.formBuilder.group({
      idProducto: [this.values ? this.values.idProducto : null],
      nombre: [this.values ? this.values.nombre : '', Validators.required],
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
        const sub$ = this.productService
          .updateProduct(valuesForm)
          .pipe(
            map(() => this.dialogRef.close('adicionar')),
            catchError(() => {
              return of(null);
            })
          )
          .subscribe();
        this.subcription.add(sub$);
      } else {
        const sub$ = this.productService
          .getProduct()
          .pipe(
            switchMap((values: Product[]) => {
              /*const maxIndex = !!values.length
                ? Math.max(...values.map((user: Product) => user.idProducto)) +
                  1
                : 1;
              valuesForm.id = maxIndex;
              valuesForm.idProducto = maxIndex;*/
              const onlyIndexs = values.map(
                (product: Product) => product.idProducto
              );
              const maxIndex = onlyIndexs.reduce((a, b) => Math.max(a, b), 0);
              valuesForm.id = maxIndex + 1;
              valuesForm.idProducto = maxIndex + 1;
              return this.productService.postProduct(valuesForm).pipe(
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
        this.subcription.add(sub$);
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
