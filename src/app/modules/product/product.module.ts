import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductDashboardListComponent } from './components/product-dashboard-list/product-dashboard-list.component';
import { NgxPaginationModule } from 'ngx-pagination';



@NgModule({
  declarations: [
    ProductDashboardListComponent,
  ],
  imports: [
    CommonModule,
    NgxPaginationModule,
  ],
  exports: [
    ProductDashboardListComponent,
  ]
})
export class ProductModule { }
