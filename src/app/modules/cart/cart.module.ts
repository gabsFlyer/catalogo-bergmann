import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyCartComponent } from './components/my-cart/my-cart.component';
import { CartItemComponent } from './components/cart-item/cart-item.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    MyCartComponent,
    CartItemComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    AngularMaterialModule,
  ],
  exports: [
    CartItemComponent,
  ]
})
export class CartModule { }
