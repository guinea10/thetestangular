import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AngularMaterialModule } from './modules/material/angular-material/angular-material.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from './services/interceptor/interceptor.service';
import { ClientModule } from './modules/client/client.module';
import { SharedModule } from './shared/shared.module';
import { ToastrModule } from 'ngx-toastr';
import { ProductModule } from './modules/product/product.module';
import { SaleModule } from './modules/sale/sale.module';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { ROOT_REDUCERS } from './state/app.state';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    StoreModule.forRoot(ROOT_REDUCERS),
    StoreDevtoolsModule.instrument({ name: 'TEST' }),
    AngularMaterialModule,
    ClientModule,
    ProductModule,
    SaleModule,
    AuthenticationModule,
    SharedModule,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: InterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
