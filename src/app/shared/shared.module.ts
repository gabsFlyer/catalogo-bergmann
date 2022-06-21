import { UnauthorizedInterceptor } from './interceptors/unauthorized.interceptor';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarDashboardComponent } from './components/navbar-dashboard/navbar-dashboard.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ImageUploadComponent } from './components/image-upload/image-upload.component';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    NavbarDashboardComponent,
    ImageUploadComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UnauthorizedInterceptor,
      multi: true
    }
  ],
  exports: [
    NavbarDashboardComponent,
    ImageUploadComponent,
  ]
})
export class SharedModule { }
