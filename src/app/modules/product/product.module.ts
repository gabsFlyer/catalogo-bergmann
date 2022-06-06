import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductDashboardListComponent } from './components/product-dashboard-list/product-dashboard-list.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { ProductDashboardComponent } from './components/product-dashboard/product-dashboard.component';



@NgModule({
  declarations: [
    ProductDashboardListComponent,
    ProductDashboardComponent,
  ],
  imports: [
    CommonModule,
    NgxPaginationModule,
    AngularMaterialModule,
  ],
  exports: [
    ProductDashboardListComponent,
  ]
})
export class ProductModule { }
