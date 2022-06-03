import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductDashboardListComponent } from './components/product-dashboard-list/product-dashboard-list.component';



@NgModule({
  declarations: [
    ProductDashboardListComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    ProductDashboardListComponent,
  ]
})
export class ProductModule { }
