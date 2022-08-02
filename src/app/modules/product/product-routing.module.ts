import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "src/app/shared/guards/auth.guard";
import { ProductDashboardListComponent } from "./components/product-dashboard-list/product-dashboard-list.component";
import { ProductDashboardComponent } from "./components/product-dashboard/product-dashboard.component";

const routes: Routes = [
  {
    path: 'dashboard/products',
    pathMatch: 'full',
    component: ProductDashboardListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'dashboard/products/new',
    pathMatch: 'full',
    component: ProductDashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'dashboard/products/edit/:id',
    pathMatch: 'full',
    component: ProductDashboardComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class ProductRoutingModule { }
