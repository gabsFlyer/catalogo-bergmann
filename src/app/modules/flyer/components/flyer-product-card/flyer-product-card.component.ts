import { Component, Input, OnInit } from '@angular/core';
import { FlyerProduct } from 'src/app/shared/models/flyer-product.model';

@Component({
  selector: 'app-flyer-product-card',
  templateUrl: './flyer-product-card.component.html',
  styleUrls: ['./flyer-product-card.component.css']
})
export class FlyerProductCardComponent implements OnInit {

  @Input() flyerProduct: FlyerProduct = new FlyerProduct();

  constructor() { }

  ngOnInit(): void {
  }

}
