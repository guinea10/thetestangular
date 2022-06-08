import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppState } from 'src/app/state/app.state';
import { selectorDataUser } from 'src/app/state/selectors/selector';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit, OnDestroy {
  user = '';
  subcription: Subscription = new Subscription();
  usersData$: Observable<string> = new Observable();
  navItems: { name: string; iconName: string; route: string }[] = [
    {
      name: 'Usuarios',
      iconName: 'supervisor_account',
      route: 'users',
    },
    {
      name: 'Productos',
      iconName: 'local_cafe',
      route: 'products',
    },
    {
      name: 'Salir',
      iconName: 'account_circle',
      route: '',
    },
  ];

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.usersData$ = this.store.select(selectorDataUser);
    const sub = this.usersData$
      .pipe(
        map((user: string) => {
          this.user = user;
          if (user !== 'admin') {
            this.navItems = [
              {
                name: 'Venta',
                iconName: 'local_grocery_store',
                route: 'sale',
              },
              {
                name: 'Salir',
                iconName: 'account_circle',
                route: '',
              },
            ];
          }
        })
      )
      .subscribe();
    this.subcription.add(sub);
  }

  ngOnDestroy(): void {
    this.subcription.unsubscribe();
  }
}
