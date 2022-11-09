import { formatNumber } from '@angular/common';
import { Component, Inject, OnInit, LOCALE_ID } from '@angular/core';
import { ProductService } from 'src/app/modules/product/services/product.service';
import { CartProduct } from 'src/app/shared/models/cart-product.model';
import { FlyerProduct } from 'src/app/shared/models/flyer-product.model';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.component.html',
  styleUrls: ['./my-cart.component.css']
})
export class MyCartComponent implements OnInit {

  public cartProducts: Array<CartProduct> = [];

  constructor(
    private cartService: CartService,
    private productService: ProductService,
    @Inject(LOCALE_ID) public locale: string,
  ) { }

  ngOnInit(): void {
    this.loadCartItems();
  }

  loadCartItems(): void {
    this.cartProducts = this.cartService.getCartProducts()
  }

  removeFlyerProductFromCart(flyerProduct: FlyerProduct): void {
    this.cartService.removeFlyerProductFromCart(flyerProduct);

    this.loadCartItems();
  }

  getTotalPrice(): number {
    let price: number = 0;

    this.cartProducts.forEach(cartProduct => {
      const product = cartProduct.flyerProduct.product;
      const productTotalPrice: number = this.productService.getProductTotalPrice(product, cartProduct.quantity);

      price += productTotalPrice;
    });

    return price;
  }

  getWhatsappUrl(): string {
    const whatsappNumber = "5399011220";

    return `http://wa.me/55${whatsappNumber}?text=${this.createWhatsappMessageText()}`;
  }

  sendRequestToWhatsapp(): void {
    window.open(this.getWhatsappUrl(), '_blank');
  }

  createWhatsappMessageText(): string {
    const newLine = '%0A';

    let messageText = `Olá! Acabei de criar um pedido via catálogo online!${newLine}${newLine}`;

    this.cartProducts.forEach(cartProduct => {
      const product = cartProduct.flyerProduct.product;
      const quantity = cartProduct.quantity;
      const productTotalPrice = this.productService.getProductTotalPrice(product, quantity);

      const productLine = `${quantity}x ${product.name} – R$ ${this.formatValue(productTotalPrice)} ${newLine}`;

      messageText += productLine;
    });

    messageText += `${newLine}Total: R$ ${this.formatValue(this.getTotalPrice())}`;

    return messageText;
  }

  formatValue(value: number) {
    return formatNumber(value, this.locale, '2.2-3')
  }

}
