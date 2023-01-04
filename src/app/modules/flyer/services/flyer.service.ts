import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiEndpoints } from 'src/app/shared/constants/api-endpoints.constant';
import { IResponsePageable } from 'src/app/shared/interfaces/response-pageable.interface';
import { Flyer } from 'src/app/shared/models/flyer.model';
import { Utilities } from 'src/app/shared/util/utilities.util';

@Injectable({
  providedIn: 'root'
})
export class FlyerService {

  constructor(
    private http: HttpClient,
  ) { }

  getCurrentFlyer(): Observable<Flyer> {
    const url = apiEndpoints.currentFlyer;

    return this.http.get<Flyer>(url);
  }

  getFlyers(page: number): Observable<IResponsePageable<Array<Flyer>>> {
    const url = Utilities.formatString(apiEndpoints.flyer.indexPaginated, page.toString());

    return this.http.get<IResponsePageable<Array<Flyer>>>(url);
  }

  getFlyer(id: number): Observable<Flyer> {
    const url = Utilities.formatString(apiEndpoints.flyer.show, id.toString());

    return this.http.get<Flyer>(url);
  }

  storeFlyer(flyer: Flyer): Observable<Flyer> {
    const url = apiEndpoints.flyer.store;

    return this.http.post<Flyer>(url, flyer);
  }

  updateFlyer(id: number, flyer: Flyer): Observable<Flyer> {
    const url = Utilities.formatString(apiEndpoints.flyer.update, id.toString());

    return this.http.put<Flyer>(url, flyer);
  }

  destroyFlyer(id: number): Observable<Object> {
    const url = Utilities.formatString(apiEndpoints.flyer.destroy, id.toString());

    return this.http.delete(url);
  }

}
