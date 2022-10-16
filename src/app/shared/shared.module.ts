import { UnauthorizedInterceptor } from './interceptors/unauthorized.interceptor';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ImageUploadComponent } from './components/image-upload/image-upload.component';
import { MatIconModule } from '@angular/material/icon';
import { UnprocessableEntityInterceptor } from './interceptors/unprocessable-entity.interceptor';


@NgModule({
  declarations: [
    NavbarComponent,
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
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UnprocessableEntityInterceptor,
      multi: true
    }
  ],
  exports: [
    NavbarComponent,
    ImageUploadComponent,
  ]
})
export class SharedModule { }
