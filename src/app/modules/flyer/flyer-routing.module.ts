import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "src/app/shared/guards/auth.guard";
import { FlyerDashboardListComponent } from "./components/flyer-dashboard-list/flyer-dashboard-list.component";
import { FlyerDashboardComponent } from "./components/flyer-dashboard/flyer-dashboard.component";

const routes: Routes = [
  {
    path: 'dashboard/flyers',
    pathMatch: 'full',
    component: FlyerDashboardListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'dashboard/flyers/new',
    pathMatch: 'full',
    component: FlyerDashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'dashboard/flyers/edit/:id',
    pathMatch: 'full',
    component: FlyerDashboardComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class FlyerRoutingModule { }
