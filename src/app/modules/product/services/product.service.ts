import { Observable } from 'rxjs';
import { IResponsePageable } from './../../../shared/interfaces/response-pageable.interface';
import { apiEndpoints } from './../../../shared/constants/api-endpoints.constant';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from 'src/app/shared/models/product.model';
import { Utilities } from 'src/app/shared/util/utilities.util';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http: HttpClient
  ) { }

  getProducts(page: number): Observable<IResponsePageable<Array<Product>>> {
    const url = Utilities.formatString(apiEndpoints.product.index, page.toString());

    return this.http
      .get<IResponsePageable<Array<Product>>>(url);
  }
}
