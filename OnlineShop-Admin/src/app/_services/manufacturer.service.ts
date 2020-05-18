import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Manufacturer } from '../_models/Manufacturer';

@Injectable({
  providedIn: 'root'
})
export class ManufacturerService {
  baseUrl = environment.apiUrl;

  formData: Manufacturer;
  constructor(private http: HttpClient) { }

  getManufacturers(): Observable<Manufacturer[]>{
    return this.http.get<Manufacturer[]>(this.baseUrl + 'manufacturers');
  }

  getManufacturer(id): Observable<Manufacturer>{
    return this.http.get<Manufacturer>(this.baseUrl + 'manufacturers/' + id);
  }

  addManufacturer(){
    return this.http.post(this.baseUrl + 'manufacturers/add', this.formData);
  }

  updateManufacturer(id: number, manufacturer: Manufacturer){
    return this.http.put(this.baseUrl + 'manufacturers/' + id, manufacturer);
  }

  deleteManufacturer(id: number){
    return this.http.delete(this.baseUrl + 'manufacturers/' + id, {});
  }
}
