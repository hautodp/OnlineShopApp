import { Injectable } from '@angular/core';
import { Order } from '../_models/Order';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserOrdersService {
  baseUrl = environment.apiUrl;
constructor(private http: HttpClient) { }


GetListUserOrders(idUser): Observable<Order[]>{
  let params = new HttpParams().set('idUser', idUser);
  console.log(idUser);
  return this.http.get<Order[]>(this.baseUrl + 'payment/order',  {params});
}
}
