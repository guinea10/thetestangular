import { Component, OnInit } from '@angular/core';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { of, Subscription } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Product } from 'src/app/shared/models/product';
import { AddEditProductComponent } from '../add-edit-product/add-edit-product.component';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss']
})
export class ListProductComponent implements OnInit {
  subcription: Subscription = new Subscription();
  cargando = false;
  dataSource = new MatTableDataSource();
  pageIndex = 0;
  pageSize = 5;
  length = 0;

  products: Product[] = [
    {
      idProducto: 1,
      nombre: 'Arroz',
      precio: 10.20
    }
  ];
  columsProps: {head: string, data: string}[] = [
    {
      head: 'ID',
      data: 'idProducto',
    },
    {
      head: 'Nombre',
      data: 'nombre',
    },
    {
      head: 'Precio',
      data: 'precio',
    },
    {
      head: 'acciones',
      data: 'idProducto',
    },
  ];

  actionProps: {name: string, style: string}[] = [
    { name: 'Editar', style: 'fa fa-pencil fa-lg p-1 text-primary mr-2' },
    { name: 'Eliminar', style: 'fa fa-trash-o fa-lg text-danger p-1' },
  ];

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
    this.loadData();
  }

  ngOnDestroy() {
    this.subcription.unsubscribe();
  }

  processActions(event: { actions: string, id: number }) {
    const { actions, id } = event;
    if (actions === 'Editar') {
      const index = this.products.findIndex((values: Product) => values.idProducto === id);
      const data = this.products[index];
      const sub$ = this.dialog
        .open(AddEditProductComponent, {
          width: '80vw',
          height:'80vh',
          maxWidth: '100vw',
          maxHeight: '100vh',
          disableClose: true,
          autoFocus: true,
          panelClass: 'window',
          data,
        })
        .afterClosed()
        .pipe(
          map((value: Product | undefined) => {
            if (!!value) {
              const indexAgain = this.products.findIndex((values: Product) => values.idProducto === id);
              this.products[indexAgain] = value;
              this.loadData();
            }
          }),
          catchError(() => {
            return of(null);
          })
        )
        .subscribe();
      this.subcription.add(sub$);
    }
    if (actions === 'Eliminar') {
        this.products = this.products.filter((values: Product) => values.idProducto !== id);
        this.loadData();
    }
  }

  aditionProduct() {
    const sub$ = this.dialog
        .open(AddEditProductComponent, {
          width: '80vw',
          height:'80vh',
          maxWidth: '100vw',
          maxHeight: '100vh',
          disableClose: true,
          autoFocus: true,
          data: null,
        })
        .afterClosed()
        .pipe(
          map((value: Product | undefined) => {
            if (!!value) {
              const dataSend = value;
              dataSend.idProducto = this.products.length + 1;
              this.products.push(dataSend);
              this.loadData();
            }
          }),
          catchError(() => {
            return of(null);
          })
        )
        .subscribe();
    this.subcription.add(sub$);
  }

  loadData() {
    this.dataSource.data = this.products;
    this.length = this.products.length;
  }

  pageChangeEvent(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }
}
