import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "src/app/shared/guards/auth.guard";
import { EnterpriseDashboardListComponent } from "./components/enterprise-dashboard-list/enterprise-dashboard-list.component";
import { EnterpriseDashboardComponent } from "./components/enterprise-dashboard/enterprise-dashboard.component";

const routes: Routes = [
  {
    path: 'dashboard/enterprises',
    pathMatch: 'full',
    component: EnterpriseDashboardListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'dashboard/enterprises/new',
    pathMatch: 'full',
    component: EnterpriseDashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'dashboard/enterprises/edit/:id',
    pathMatch: 'full',
    component: EnterpriseDashboardComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class EnterpriseRoutingModule { }
