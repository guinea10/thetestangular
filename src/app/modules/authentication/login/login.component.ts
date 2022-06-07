import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { loadUser } from 'src/app/state/actions/actions';
import { AppState } from 'src/app/state/app.state';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formGroup!: FormGroup;
  constructor(private route: Router, private store: Store<AppState>, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      username: [
        'admin',
        Validators.required,
      ],
      password: [
        '',
        Validators.required,
      ],
    });
  }

  actionsLogin(user: string) {
    this.store.dispatch(
      loadUser({
        data: {
          user,
          typeUser: user === 'admin' ? 'admin' : 'client' 
        },
      })
    );
  }

  enter() {
   if(this.formGroup.errors === null) {
     const user = this.formGroup.get('username').value;
     this.actionsLogin(user);
     if(user === 'admin')
     this.route.navigate(['admin/users']);
     else
     this.route.navigate(['client/sale']);
   }
  }
}
