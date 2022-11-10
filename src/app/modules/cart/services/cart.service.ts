import { Injectable } from '@angular/core';
import { CartProduct } from 'src/app/shared/models/cart-product.model';
import { Enterprise } from 'src/app/shared/models/enterprise.model';
import { FlyerProduct } from 'src/app/shared/models/flyer-product.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  get cartProductsStorageKey(): string {
    return environment.sessionStorage.myCartProducts || '';
  }

  get enterpriseStorageKey(): string {
    return environment.sessionStorage.enterprise || '';
  }

  constructor() { }

  addProductToCart(flyerProduct: FlyerProduct, quantity: number): void {
    const productCart = new CartProduct();
    productCart.flyerProduct = flyerProduct;
    productCart.quantity = quantity;

    const cartProducts = this.getCartProducts();
    cartProducts.push(productCart);

    this.setCartProducts(cartProducts);
  }

  removeFlyerProductFromCart(flyerProduct: FlyerProduct): void {
    const products = this.getCartProducts();

    products.forEach((element, index) => {
      if (element.flyerProduct.id === flyerProduct.id) {
        products.splice(index, 1);
      }
    });

    this.setCartProducts(products);
  }

  getCartProducts(): Array<CartProduct> {
    const localstorageProducts = localStorage.getItem(this.cartProductsStorageKey);

    return localstorageProducts ? JSON.parse(localstorageProducts) : new Array<CartProduct>();
  }

  setCartProducts(products: Array<CartProduct>): void {
    localStorage.setItem(this.cartProductsStorageKey, JSON.stringify(products));
  }

  getEnterprise(): Enterprise {
    const enterprise = localStorage.getItem(this.enterpriseStorageKey);

    return enterprise ? JSON.parse(enterprise) : new Enterprise;
  }

  setEnterprise(enterprise: Enterprise): void {
    localStorage.setItem(this.enterpriseStorageKey, JSON.stringify(enterprise));
  }
}
