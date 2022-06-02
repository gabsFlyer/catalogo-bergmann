import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule } from '@angular/forms';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { ToastrModule } from 'ngx-toastr';

const maskConfig: Partial<IConfig> = {
  validation: false,
};

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    NgxMaskModule.forRoot(maskConfig),
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    SharedModule,
    CommonModule,
    FormsModule
  ],
  exports: [
    LoginComponent,
    RegisterComponent,
  ]
})
export class LoginModule { }
