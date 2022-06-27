import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlyerComponent } from './components/flyer/flyer.component';
import { FlyerDashboardListComponent } from './components/flyer-dashboard-list/flyer-dashboard-list.component';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    FlyerComponent,
    FlyerDashboardListComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgxPaginationModule,
    AngularMaterialModule,
    SharedModule,
  ],
  exports: [
    FlyerComponent,
    FlyerDashboardListComponent,
  ]
})
export class FlyerModule { }
