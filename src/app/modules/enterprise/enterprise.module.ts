import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnterpriseDashboardListComponent } from './components/enterprise-dashboard-list/enterprise-dashboard-list.component';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    EnterpriseDashboardListComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgxPaginationModule,
    AngularMaterialModule,
    SharedModule,
  ],
  exports: [
    EnterpriseDashboardListComponent,
  ]
})
export class EnterpriseModule { }
