import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Sale } from 'src/app/shared/models/sale';

@Component({
  selector: 'app-list-sale',
  templateUrl: './list-sale.component.html',
  styleUrls: ['./list-sale.component.scss']
})
export class ListSaleComponent implements OnInit {
  cargando = false;
  dataSource = new MatTableDataSource();
  pageIndex = 0;
  pageSize = 5;
  length = 0;
  sale: Sale[] = [
    {
      idVenta: 1,
      idCliente: {
        idCliente: 1,
        nombre: 'Juan',
        apellido: 'Francisco',
        dni: 91040407803,
        telefono: '78958989',
        email: 'clienta@gmail.com'
      },
      nombreCliente: 'Juan',
      fecha: '2021-08-10'
    }
  ];
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

  constructor() { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.dataSource.data = this.sale;
    this.length = this.length;
  }

  pageChangeEvent(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }
}
