import { Component, OnInit } from '@angular/core';
import { CartProduct } from 'src/app/shared/models/cart-product.model';
import { FlyerProduct } from 'src/app/shared/models/flyer-product.model';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.component.html',
  styleUrls: ['./my-cart.component.css']
})
export class MyCartComponent implements OnInit {

  public products: Array<CartProduct> = [];

  constructor(
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.loadCartItems();
  }

  loadCartItems(): void {
    this.products = this.cartService.getCartProducts()
  }

  removeFlyerProductFromCart(flyerProduct: FlyerProduct): void {
    this.cartService.removeFlyerProductFromCart(flyerProduct);

    this.loadCartItems();
  }

}
