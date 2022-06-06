import { ProductDashboardComponent } from './modules/product/components/product-dashboard/product-dashboard.component';
import { ProductDashboardListComponent } from './modules/product/components/product-dashboard-list/product-dashboard-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './modules/dashboard/components/dashboard/dashboard.component';
import { FlyerComponent } from './modules/flyer/components/flyer/flyer.component';
import { LoginComponent } from './modules/login/components/login/login.component';
import { LogoutComponent } from './modules/login/components/logout/logout.component';
import { RegisterComponent } from './modules/login/components/register/register.component';
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'catalogo',
    pathMatch: 'full'
  },
  {
    path: 'catalogo',
    pathMatch: 'full',
    component: FlyerComponent
  },
  {
    path: 'login',
    pathMatch: 'full',
    component: LoginComponent
  },
  {
    path: 'logout',
    pathMatch: 'full',
    component: LogoutComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'register',
    pathMatch: 'full',
    component: RegisterComponent
  },
  {
    path: 'dashboard',
    pathMatch: 'full',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'dashboard/products',
    pathMatch: 'full',
    component: ProductDashboardListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'dashboard/products/new',
    pathMatch: 'full',
    component: ProductDashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'dashboard/products/edit',
    pathMatch: 'full',
    component: ProductDashboardComponent,
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
