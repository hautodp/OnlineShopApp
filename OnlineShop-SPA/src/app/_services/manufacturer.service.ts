import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Manufactuerer } from '../_models/Manufactuerer';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManufacturerService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getManufacturers(): Observable<Manufactuerer[]>{
    return this.http.get<Manufactuerer[]>(this.baseUrl + 'manufacturers');
  }
}
