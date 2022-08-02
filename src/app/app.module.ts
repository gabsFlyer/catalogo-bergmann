import { LoginModule } from './modules/login/login.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { ProductModule } from './modules/product/product.module';
import { AngularMaterialModule } from './modules/angular-material/angular-material.module';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { EnterpriseModule } from './modules/enterprise/enterprise.module';
import { FlyerModule } from './modules/flyer/flyer.module';
import { ProductRoutingModule } from './modules/product/product-routing.module';
import { EnterpriseRoutingModule } from './modules/enterprise/enterprise-routing.module';
import { LoginRoutingModule } from './modules/login/login-routing.module';
import { FlyerRoutingModule } from './modules/flyer/flyer-routing.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AngularMaterialModule,
    SharedModule,

    LoginModule,
    LoginRoutingModule,

    ProductModule,
    ProductRoutingModule,

    EnterpriseModule,
    EnterpriseRoutingModule,

    FlyerModule,
    FlyerRoutingModule,
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
