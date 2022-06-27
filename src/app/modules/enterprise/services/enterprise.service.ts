import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiEndpoints } from 'src/app/shared/constants/api-endpoints.constant';
import { IResponsePageable } from 'src/app/shared/interfaces/response-pageable.interface';
import { Enterprise } from 'src/app/shared/models/enterprise.model';
import { Utilities } from 'src/app/shared/util/utilities.util';

@Injectable({
  providedIn: 'root'
})
export class EnterpriseService {

  constructor(
    private http: HttpClient,
  ) { }

  getEnterprises(page: number): Observable<IResponsePageable<Array<Enterprise>>> {
    const url = Utilities.formatString(apiEndpoints.enterprise.indexPaginated, page.toString());

    return this.http.get<IResponsePageable<Array<Enterprise>>>(url);
  }

  getEnterprise(id: number): Observable<Enterprise> {
    const url = Utilities.formatString(apiEndpoints.enterprise.show, id.toString());

    return this.http.get<Enterprise>(url);
  }

  storeEnterprise(enterprise: Enterprise): Observable<Enterprise> {
    const url = apiEndpoints.enterprise.store;

    return this.http.post<Enterprise>(url, enterprise);
  }

  updateEnterprise(id: number, enterprise: Enterprise): Observable<Enterprise> {
    const url = Utilities.formatString(apiEndpoints.enterprise.update, id.toString());

    return this.http.put<Enterprise>(url, enterprise);
  }

  destroyEnterprise(id: number): Observable<Object> {
    const url = Utilities.formatString(apiEndpoints.enterprise.destroy, id.toString());

    return this.http.delete(url);
  }

}
