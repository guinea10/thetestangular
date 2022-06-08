import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppState } from 'src/app/state/app.state';
import { selectorTypeUser } from 'src/app/state/selectors/selector';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  existUser: Observable<any> = new Observable();
  dataUser: any;
  constructor(private router: Router, private store: Store<AppState>) {}

  canActivate(): boolean {
    this.existUser = this.store.select(selectorTypeUser);
    this.existUser
      .pipe(map((val: string) => (this.dataUser = val)))
      .subscribe();
    if (this.dataUser === 'admin') {
      return true;
    } else {
      this.router.navigate(['']);
      return false;
    }
  }
}
