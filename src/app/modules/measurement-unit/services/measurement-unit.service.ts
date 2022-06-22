import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiEndpoints } from 'src/app/shared/constants/api-endpoints.constant';
import { MeasurementUnit } from 'src/app/shared/models/measurement-unit.model';

@Injectable({
  providedIn: 'root'
})
export class MeasurementUnitService {

  constructor(
    private http: HttpClient,
  ) { }

  getMeasurementUnits(): Observable<Array<MeasurementUnit>> {
    const url = apiEndpoints.measurementUnit.index;

    return this.http
      .get<Array<MeasurementUnit>>(url);
  }
}
