import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { of, Subscription } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Sale } from 'src/app/shared/models/sale';
import { SaleService } from '../services/sale.service';

@Component({
  selector: 'app-list-sale',
  templateUrl: './list-sale.component.html',
  styleUrls: ['./list-sale.component.scss']
})
export class ListSaleComponent implements OnInit {
  subcription: Subscription = new Subscription();
  loading = false;
  dataSource = new MatTableDataSource();
  pageIndex = 0;
  pageSize = 5;
  length = 0;
  columsProps: {head: string, data: string}[] = [
    {
      head: 'ID',
      data: 'idVenta',
    },
    {
      head: 'Cliente',
      data: 'nombreCliente',
    },
    {
      head: 'Fecha',
      data: 'fecha',
    },
  ];

  constructor(private saleService: SaleService) { }

  ngOnInit() {
    this.loadData();
  }
  
  loadData() {
    this.loading = true;
    const sub$ = this.saleService.getSale().pipe(
      map((sale: Sale[]) => {
        this.dataSource.data = sale;
        this.length = sale.length;
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
