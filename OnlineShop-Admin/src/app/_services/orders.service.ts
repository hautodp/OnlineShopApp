import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from '../_models/Order';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
baseUrl = 'http://localhost:5000/api/payment';
constructor(private http: HttpClient) { }
GetAllOrders(): Observable<Order[]>{
  return this.http.get<Order[]>(this.baseUrl);
}

updateOrder(id: number, state: number){
  return this.http.put(this.baseUrl + '/' + id + '/' + state, state);
}
}
