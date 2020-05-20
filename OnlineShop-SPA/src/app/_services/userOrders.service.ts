import { Injectable } from '@angular/core';
import { Order } from '../_models/Order';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserOrdersService {
  baseUrl = environment.apiUrl;
constructor(private http: HttpClient) { }

GetListUserOrders(idUser): Observable<Order[]>{
  return this.http.get<Order[]>(this.baseUrl + 'payment/' + idUser);
}
}
