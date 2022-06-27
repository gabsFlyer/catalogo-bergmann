import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlyerComponent } from './components/flyer/flyer.component';
import { FlyerDashboardListComponent } from './components/flyer-dashboard-list/flyer-dashboard-list.component';



@NgModule({
  declarations: [
    FlyerComponent,
    FlyerDashboardListComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FlyerComponent,
    FlyerDashboardListComponent,
  ]
})
export class FlyerModule { }
