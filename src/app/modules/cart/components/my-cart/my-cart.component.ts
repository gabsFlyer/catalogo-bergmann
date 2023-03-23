import { formatNumber } from '@angular/common';
import { Component, Inject, OnInit, LOCALE_ID } from '@angular/core';
import { Router } from '@angular/router';
import { FlyerService } from 'src/app/modules/flyer/services/flyer.service';
import { ProductService } from 'src/app/modules/product/services/product.service';
import { RoutesConstant } from 'src/app/shared/constants/routes.constant';
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

  private whatsappNumber: string = '';

  get myCartHasProducts(): boolean {
    return this.cartProducts && this.cartProducts.length > 0;
  }

  constructor(
    private cartService: CartService,
    private productService: ProductService,
    private router: Router,
    private flyerService: FlyerService,
    @Inject(LOCALE_ID) public locale: string,
  ) { }

  ngOnInit(): void {
    this.loadCartItems();
    this.loadWhatsappNumber();
  }

  loadCartItems(): void {
    this.cartProducts = this.cartService.getCartProducts()
  }

  loadWhatsappNumber(): void {
    this.flyerService.getCurrentFlyer()
      .subscribe(f => {
        this.whatsappNumber = f.enterprise.whatsapp;
      })
  }

  goToHome(): void {
    this.router.navigate([RoutesConstant.flyer.homeFyer]);
  }

  removeFlyerProductFromCart(flyerProduct: FlyerProduct): void {
    this.cartService.removeFlyerProductFromCart(flyerProduct);

    this.loadCartItems();
  }

  getTotalPrice(): number {
    let price: number = 0;

    this.cartProducts.forEach(cartProduct => {
      const productTotalPrice: number = this.productService.getProductTotalPrice(cartProduct);

      price += productTotalPrice;
    });

    return price;
  }

  sendRequestToWhatsapp(): void {
    window.open(this.getWhatsappUrl(), '_blank');
  }

  getWhatsappUrl(): string {

    return `http://wa.me/55${this.whatsappNumber}?text=${this.createWhatsappMessageText()}`;
  }

  createWhatsappMessageText(): string {
    const newLine = '%0A';

    let messageText = `Olá! Acabei de criar um pedido via catálogo online!${newLine}${newLine}`;

    this.cartProducts.forEach(cartProduct => {
      const product = cartProduct.flyerProduct.product;
      const quantity = cartProduct.quantity;
      const productTotalPrice = this.productService.getProductTotalPrice(cartProduct);

      const productDiscrimination = product.code ? `(${product.code}) ${product.name}` : product.name;

      const productLine = `${quantity}x ${productDiscrimination} – R$ ${this.formatValue(productTotalPrice)} ${newLine}`;

      messageText += productLine;
    });

    messageText += `${newLine}Total: R$ ${this.formatValue(this.getTotalPrice())}`;

    return messageText;
  }

  formatValue(value: number) {
    return formatNumber(value, this.locale, '2.2-3')
  }

}
