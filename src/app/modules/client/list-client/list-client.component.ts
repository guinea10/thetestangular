import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { of, Subscription } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Client } from 'src/app/shared/models/client';
import { AddEditClientComponent } from '../add-edit-client/add-edit-client.component';
import { ClientService } from '../services/client.service';

@Component({
  selector: 'app-list-client',
  templateUrl: './list-client.component.html',
  styleUrls: ['./list-client.component.scss'],
})
export class ListClientComponent implements OnInit, OnDestroy {
  subcription: Subscription = new Subscription();
  loading = false;
  dataSource = new MatTableDataSource();

  columsProps: { head: string; data: string }[] = [
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

  actionProps: { name: string; style: string }[] = [
    { name: 'Editar', style: 'fa fa-pencil fa-lg p-1 text-primary mr-2' },
    { name: 'Eliminar', style: 'fa fa-trash-o fa-lg text-danger p-1' },
  ];

  constructor(
    private dialog: MatDialog,
    private clientService: ClientService
  ) {}

  ngOnInit() {
    this.loadData();
  }

  ngOnDestroy() {
    this.subcription.unsubscribe();
  }

  processActions(event: { actions: string; id: number }) {
    const { actions, id } = event;
    if (actions === 'Editar') {
      const sub$ = this.clientService
        .getClientByID(id)
        .pipe(
          switchMap((data: Client) =>
            this.dialog
              .open(AddEditClientComponent, {
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
                map(() => this.loadData()),
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
      const sub$ = this.clientService
        .deleteClient(id)
        .pipe(map(() => this.loadData()))
        .subscribe();
      this.subcription.add(sub$);
    }
  }

  aditionClient() {
    const sub$ = this.dialog
      .open(AddEditClientComponent, {
        width: '80vw',
        height: '95vh',
        maxWidth: '100vw',
        maxHeight: '100vh',
        disableClose: true,
        data: null,
      })
      .afterClosed()
      .pipe(
        map(() => this.loadData()),
        catchError(() => {
          return of(null);
        })
      )
      .subscribe();
    this.subcription.add(sub$);
  }

  loadData() {
    this.loading = true;
    const sub$ = this.clientService
      .getClient()
      .pipe(
        map((client: Client[]) => {
          this.dataSource.data = client;
          this.loading = false;
        }),
        catchError(() => {
          this.loading = false;
          return of(null);
        })
      )
      .subscribe();
    this.subcription.add(sub$);
  }
}
