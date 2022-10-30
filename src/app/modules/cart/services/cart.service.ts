import { Injectable } from '@angular/core';
import { CartProduct } from 'src/app/shared/models/cart-product.model';
import { FlyerProduct } from 'src/app/shared/models/flyer-product.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  get cartProductsStorageKey(): string {
    const storageKey = sessionStorage.getItem(environment.sessionStorage.myCartProducts);

    return storageKey ? storageKey : '';
  }

  constructor() { }

  addProductToCart(product: FlyerProduct, quantity: number): void {
    const productCart = new CartProduct();
    productCart.product = product;
    productCart.quantity = quantity;

    const cartProducts = this.getCartProducts();
    cartProducts.push(productCart);

    this.setCartProducts(cartProducts);
  }

  getCartProducts(): Array<CartProduct> {
    const localstorageProducts = localStorage.getItem(this.cartProductsStorageKey)

    if (localstorageProducts) {
      return JSON.parse(localstorageProducts);
    } else {
      return new Array<CartProduct>();
    }
  }

  setCartProducts(products: Array<CartProduct>): void {
    localStorage.setItem(this.cartProductsStorageKey, JSON.stringify(products));

    console.log(this.getCartProducts());
  }
}
