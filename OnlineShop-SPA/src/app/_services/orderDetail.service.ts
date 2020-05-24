import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrderDetail } from '../_models/OrderDetail';

@Injectable({
  providedIn: 'root'
})
export class OrderDetailService {
  baseUrl = environment.apiUrl;
constructor(private http: HttpClient) { }
GetListOrderDetail(id): Observable<OrderDetail[]>{
  return this.http.get<OrderDetail[]>(this.baseUrl + 'payment/order/detail/' + id);
}
}
