import { LoginModule } from './modules/login/login.module';
import { NgModule, DEFAULT_CURRENCY_CODE, LOCALE_ID } from '@angular/core';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { ProductModule } from './modules/product/product.module';
import { AngularMaterialModule } from './modules/angular-material/angular-material.module';
import { HashLocationStrategy, LocationStrategy, registerLocaleData } from '@angular/common';
import { EnterpriseModule } from './modules/enterprise/enterprise.module';
import { FlyerModule } from './modules/flyer/flyer.module';
import { ProductRoutingModule } from './modules/product/product-routing.module';
import { EnterpriseRoutingModule } from './modules/enterprise/enterprise-routing.module';
import { LoginRoutingModule } from './modules/login/login-routing.module';
import { FlyerRoutingModule } from './modules/flyer/flyer-routing.module';
import localePt from '@angular/common/locales/pt';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { CartModule } from './modules/cart/cart.module';

registerLocaleData(localePt);

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
    MatIconModule,
    SharedModule,

    LoginModule,
    LoginRoutingModule,

    ProductModule,
    ProductRoutingModule,

    EnterpriseModule,
    EnterpriseRoutingModule,

    FlyerModule,
    FlyerRoutingModule,

    CartModule,
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },

    {
      provide: LOCALE_ID,
      useValue: 'pt-BR'
    },

      {
        provide:  DEFAULT_CURRENCY_CODE,
        useValue: 'BRL'
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(matIconRegistry: MatIconRegistry, domSanitizer: DomSanitizer){
    matIconRegistry.addSvgIconSet(
      domSanitizer.bypassSecurityTrustResourceUrl('./assets/mdi.svg')
    );
  }
}
