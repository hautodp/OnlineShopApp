import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Manufacturer } from '../_models/Manufacturer';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManufacturerService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getManufacturers(): Observable<Manufacturer[]>{
    return this.http.get<Manufacturer[]>(this.baseUrl + 'manufacturers');
  }
}
