import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './modules/authentication/login/login.component';
import { ListClientComponent } from './modules/client/list-client/list-client.component';
import { ListProductComponent } from './modules/product/list-product/list-product.component';
import { ListSaleComponent } from './modules/sale/list-sale/list-sale.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { AdminGuard } from './shared/guards/admin/admin.guard';
import { ClientGuard } from './shared/guards/client/client.guard';

const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'admin',
    component: SidebarComponent,
    children: [
      {
        path: '',
        redirectTo: 'users',
        pathMatch: 'full',
      },
      {
        path: 'users',
        component: ListClientComponent,
        canActivate: [AdminGuard],
      },
      {
        path: 'products',
        component: ListProductComponent,
        canActivate: [AdminGuard],
      },
    ],
  },
  {
    path: 'client',
    component: SidebarComponent,
    children: [
      {
        path: '',
        redirectTo: 'sale',
        pathMatch: 'full',
      },
      {
        path: 'sale',
        component: ListSaleComponent,
        canActivate: [ClientGuard],
      },
    ],
  },
  {
    path: '**',
    component: LoginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
