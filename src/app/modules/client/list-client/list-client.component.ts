import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { Store } from '@ngrx/store';
import { Observable, of, Subscription } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Client } from 'src/app/shared/models/client';
import { AppState } from 'src/app/state/app.state';
import { selectorChangeMenu } from 'src/app/state/selectors/selector';
import { AddEditClientComponent } from '../add-edit-client/add-edit-client.component';

@Component({
  selector: 'app-list-client',
  templateUrl: './list-client.component.html',
  styleUrls: ['./list-client.component.scss']
})
export class ListClientComponent implements OnInit, OnDestroy {
  menu = true;
  users$: Observable<any> = new Observable();
  subcription: Subscription = new Subscription();
  cargando = false;
  dataSource = new MatTableDataSource();
  pageIndex = 0;
  pageSize = 5;
  length = 0;
  clients: Client[] = [
    {
      idCliente: 1,
      nombre: 'Juan',
      apellido: 'Francisco',
      dni: 74040407854,
      telefono: '78958989',
      email: 'clienta@gmail.com'
    }
  ];
  columsProps: {head: string, data: string}[] = [
    {
      head: 'ID',
      data: 'idCliente',
    },
    {
      head: 'Nombre',
      data: 'nombre',
    },
    {
      head: 'DNI',
      data: 'dni',
    },
    {
      head: 'Telefono',
      data: 'telefono',
    },
    {
      head: 'Email',
      data: 'email',
    },
    {
      head: 'acciones',
      data: 'idCliente',
    },
  ];

  actionProps: {name: string, style: string}[] = [
    { name: 'Editar', style: 'fa fa-pencil fa-lg p-1 text-primary mr-2' },
    { name: 'Eliminar', style: 'fa fa-trash-o fa-lg text-danger p-1' },
  ];

  constructor(private dialog: MatDialog, private store: Store<AppState>) { }

  ngOnInit() {
    this.users$ = this.store.select(selectorChangeMenu);
    this.users$.subscribe((val: boolean) => (this.menu = val));

    this.loadData();
  }

  ngOnDestroy() {
    this.subcription.unsubscribe();
  }

  processActions(event: { actions: string, id: number }) {
    const { actions, id } = event;
    if (actions === 'Editar') {
      const index = this.clients.findIndex((values: Client) => values.idCliente === id);
      const data = this.clients[index];
      const sub$ = this.dialog
        .open(AddEditClientComponent, {
          width: '80vw',
          height:'95vh',
          maxWidth: '100vw',
          maxHeight: '100vh',
          disableClose: true,
          autoFocus: true,
          data,
        })
        .afterClosed()
        .pipe(
          map((value: Client | undefined) => {
            if (!!value) {
              const indexAgain = this.clients.findIndex((values: Client) => values.idCliente === id);
              this.clients[indexAgain] = value;
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
        this.clients = this.clients.filter((values: Client) => values.idCliente !== id);
        this.loadData();
    }
  }

  aditionClient() {
    const sub$ = this.dialog
        .open(AddEditClientComponent, {
          width: '80vw',
          height:'95vh',
          maxWidth: '100vw',
          maxHeight: '100vh',
          disableClose: true,
          data: null
        })
        .afterClosed()
        .pipe(
          map((value: Client | undefined) => {
            if (!!value) {
              const dataSend = value;
              dataSend.idCliente = this.clients.length + 1;
              this.clients.push(dataSend);
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
    this.dataSource.data = this.clients;
    this.length = this.clients.length;
  }

  pageChangeEvent(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }
}
