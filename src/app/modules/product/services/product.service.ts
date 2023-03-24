import { Observable } from 'rxjs';
import { IResponsePageable } from './../../../shared/interfaces/response-pageable.interface';
import { apiEndpoints } from './../../../shared/constants/api-endpoints.constant';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from 'src/app/shared/models/product.model';
import { Utilities } from 'src/app/shared/util/utilities.util';
import { CartProduct } from 'src/app/shared/models/cart-product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http: HttpClient
  ) { }

  getProducts(page: number): Observable<IResponsePageable<Array<Product>>> {
    const url = Utilities.formatString(apiEndpoints.product.indexPaginated, page.toString());

    return this.http.get<IResponsePageable<Array<Product>>>(url);
  }

  getProductList() : Observable<Array<Product>> {
    const url = apiEndpoints.product.index;

    return this.http.get<Array<Product>>(url);
  }

  getProduct(id: number): Observable<Product> {
    const url = Utilities.formatString(apiEndpoints.product.show, id.toString());

    return this.http.get<Product>(url);
  }

  storeProduct(product: Product): Observable<Product> {
    const url = apiEndpoints.product.store;

    return this.http.post<Product>(url, product);
  }

  updateProduct(id: number, product: Product): Observable<Product> {
    const url = Utilities.formatString(apiEndpoints.product.update, id.toString());

    return this.http.put<Product>(url, product);
  }

  destroyProduct(id: number): Observable<Object> {
    const url = Utilities.formatString(apiEndpoints.product.destroy, id.toString());

    return this.http.delete(url);
  }

  getProductTotalPrice(cartProduct: CartProduct): number {
    const product = cartProduct.flyerProduct.product;
    const quantity = cartProduct.quantity;
    const offerPrice = cartProduct.flyerProduct.offer_price;
    const wholesaleMinimumQuantity = product.wholesale_minimum_quantity;

    if (offerPrice > 0) {
      return quantity * offerPrice;
    }

    if (wholesaleMinimumQuantity > 0 && quantity >= wholesaleMinimumQuantity) {
      return quantity * product.wholesale_price;
    }

    return quantity * product.unit_price;
  }
}
