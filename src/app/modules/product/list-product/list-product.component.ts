import { Component, OnInit } from '@angular/core';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { of, Subscription } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Product } from 'src/app/shared/models/product';
import { AddEditProductComponent } from '../add-edit-product/add-edit-product.component';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss']
})
export class ListProductComponent implements OnInit {
  subcription: Subscription = new Subscription();
  loading = false;
  dataSource = new MatTableDataSource();
  pageIndex = 0;
  pageSize = 5;
  length = 0;

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

  constructor(private dialog: MatDialog, private productService: ProductService) { }

  ngOnInit() {
    this.loadData();
  }

  ngOnDestroy() {
    this.subcription.unsubscribe();
  }

  processActions(event: { actions: string, id: number }) {
    const { actions, id } = event;
    if (actions === 'Editar') {
      const sub$ = this.productService
        .getProductByID(id)
        .pipe(
          switchMap((data: Product) =>
            this.dialog
              .open(AddEditProductComponent, {
                width: '80vw',
                height: '95vh',
                maxWidth: '100vw',
                maxHeight: '100vh',
                disableClose: true,
                autoFocus: true,
                data,
              })
              .afterClosed()
              .pipe(
                map((value: string | undefined) => {
                  if (!!value) {   
                    this.loadData();
                  }
                }),
                catchError(() => {
                  return of(null);
                })
              )
          ),
          catchError(() => {
            return of(null);
          })
        )
        .subscribe();

      this.subcription.add(sub$);
    }
    if (actions === 'Eliminar') {
      const sub$ = this.productService
      .deleteProduct(id)
      .pipe(map(() => this.loadData()))
      .subscribe();
    this.subcription.add(sub$);
    }
  }

  aditionProduct() {
    const sub$ = this.dialog
      .open(AddEditProductComponent, {
        width: '80vw',
        height: '95vh',
        maxWidth: '100vw',
        maxHeight: '100vh',
        disableClose: true,
        data: null,
      })
      .afterClosed()
      .pipe(
        map((value: string | undefined) => {
          if (!!value) {   
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
    this.loading = true;
    const sub$ = this.productService.getProduct().pipe(
      map((product: Product[]) => {
        this.dataSource.data = product;
        this.length = product.length;
        this.loading = false;
      }),
      catchError(() => {
        this.loading = false;
        return of(null);
      })
    ).subscribe();
    this.subcription.add(sub$);
  }

  pageChangeEvent(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }
}
