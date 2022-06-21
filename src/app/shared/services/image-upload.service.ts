import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiEndpoints } from '../constants/api-endpoints.constant';
import { File } from '../models/file.model';
import { Utilities } from '../util/utilities.util';

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {

  constructor(
    private http: HttpClient
  ) { }

  storeImage(image: any): Observable<File> {
    const url = apiEndpoints.file.store;

    const formData: FormData = new FormData();
    formData.append('image', image);

    return this.http.post<File>(url, formData);
  }

  destroyImage(id: number): Observable<Object> {
    const url = Utilities.formatString(apiEndpoints.file.destroy, id.toString());

    return this.http.delete(url);
  }
}
