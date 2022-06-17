import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductDashboardListComponent } from './components/product-dashboard-list/product-dashboard-list.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { AngularMaterialModule } from '../angular-material/angular-material.module';



@NgModule({
  declarations: [
    ProductDashboardListComponent,
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
