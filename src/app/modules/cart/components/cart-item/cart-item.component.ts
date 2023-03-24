import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CartProduct } from 'src/app/shared/models/cart-product.model';
import { environment } from 'src/environments/environment';
import { ProductService } from 'src/app/modules/product/services/product.service';

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

  constructor(
    private productService: ProductService,
  ) { }

  removeFlyerProduct(): void {
    this.removeFlyerProductFromCart.emit(this.cartProduct.flyerProduct);
  }

  getCartItemTotalPrice(): number {
    return this.productService.getProductTotalPrice(this.cartProduct);
  }

}
