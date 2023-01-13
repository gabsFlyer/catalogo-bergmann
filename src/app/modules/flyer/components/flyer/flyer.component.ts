import { Flyer } from 'src/app/shared/models/flyer.model';
import { Component, OnInit } from '@angular/core';
import { FlyerService } from '../../services/flyer.service';
import { CartService } from 'src/app/modules/cart/services/cart.service';
import { FlyerProduct } from 'src/app/shared/models/flyer-product.model';

@Component({
  selector: 'app-flyer',
  templateUrl: './flyer.component.html',
  styleUrls: ['./flyer.component.css']
})
export class FlyerComponent implements OnInit {

  flyer = new Flyer();
  flyerProductsOrdered: Array<FlyerProduct> = [];

  flyerDoesntExists: boolean = false;

  constructor(
    private flyerService: FlyerService,
    private cartService: CartService,
  ) { }

  ngOnInit(): void {
    this.loadFlyer();
  }

  loadFlyer() {
    this.flyerService.getCurrentFlyer()
      .subscribe({
        next: (flyer: Flyer) => {
          this.flyer = flyer;
          this.flyerDoesntExists = false;
          this.flyerProductsOrdered = this.orderFlyerProducts(flyer.products);

          this.cartService.setEnterprise(this.flyer.enterprise);
        },
        error: err => this.flyerDoesntExists = true
      })
  }

  orderFlyerProducts(flyerProducts: Array<FlyerProduct>): Array<FlyerProduct> {
    return flyerProducts.sort((a, b) => a.product.name.localeCompare(b.product.name));
  }

}
