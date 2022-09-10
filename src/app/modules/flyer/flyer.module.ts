import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlyerComponent } from './components/flyer/flyer.component';
import { FlyerDashboardListComponent } from './components/flyer-dashboard-list/flyer-dashboard-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FlyerDashboardComponent } from './components/flyer-dashboard/flyer-dashboard.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FlyerProductCardComponent } from './components/flyer-product-card/flyer-product-card.component';



@NgModule({
  declarations: [
    FlyerComponent,
    FlyerDashboardListComponent,
    FlyerDashboardComponent,
    FlyerProductCardComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgxPaginationModule,
    AngularMaterialModule,
    SharedModule,
    MatAutocompleteModule,
  ],
  exports: [
    FlyerComponent,
    FlyerDashboardListComponent,
  ]
})
export class FlyerModule { }
