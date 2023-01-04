import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyCartComponent } from './modules/cart/components/my-cart/my-cart.component';
import { DashboardComponent } from './modules/dashboard/components/dashboard/dashboard.component';
import { FlyerComponent } from './modules/flyer/components/flyer/flyer.component';
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
    path: 'carrinho',
    pathMatch: 'full',
    component: MyCartComponent
  },
  {
    path: 'dashboard',
    pathMatch: 'full',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
