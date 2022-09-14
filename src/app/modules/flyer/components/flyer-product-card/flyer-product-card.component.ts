import { Component, Input, OnInit } from '@angular/core';
import { apiEndpoints } from 'src/app/shared/constants/api-endpoints.constant';
import { FlyerProduct } from 'src/app/shared/models/flyer-product.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-flyer-product-card',
  templateUrl: './flyer-product-card.component.html',
  styleUrls: ['./flyer-product-card.component.css']
})
export class FlyerProductCardComponent {

  @Input() flyerProduct: FlyerProduct = new FlyerProduct();

  constructor() { }

  getProductImage(): string {
    const baseUrl = environment.api.images;

    if (!this.flyerProduct.product.file) {
      return '';
    }

    return `${baseUrl}/${this.flyerProduct.product.file.file_name}`
  }

}
