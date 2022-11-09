import { FlyerProduct } from 'src/app/shared/models/flyer-product.model';
import { outputAst } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CartProduct } from 'src/app/shared/models/cart-product.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent {

  @Input() cartProduct: CartProduct = new CartProduct();

  @Output() removeFlyerProductFromCart = new EventEmitter();

  get productImage(): String {
    const baseUrl = environment.api.images;

    if (!this.cartProduct.flyerProduct.product.file) {
      return '';
    }

    return `${baseUrl}/${this.cartProduct.flyerProduct.product.file.file_name}`
  }

  constructor() { }

  removeFlyerProduct(): void {
    this.removeFlyerProductFromCart.emit(this.cartProduct.flyerProduct);
  }

  getCartItemTotalPrice(): number {
    return this.cartProduct.quantity * this.getProductPrice();
  }

  getProductPrice(): number {
    if (!this.cartProduct.flyerProduct
    ||  !this.cartProduct.flyerProduct.product
    ||  this.cartProduct.quantity <= 0
    ) {
      return 0;
    }

    const wholesaleMinimumQuantity = this.cartProduct.flyerProduct.product.wholesale_minimum_quantity;

    if (wholesaleMinimumQuantity > 0 && this.cartProduct.quantity >= wholesaleMinimumQuantity) {
      return this.cartProduct.flyerProduct.product.wholesale_price;
    }
    else {
      return this.cartProduct.flyerProduct.product.unit_price;
    }
  }

}
