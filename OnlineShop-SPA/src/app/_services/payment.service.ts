import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  baseURL = environment.apiUrl + 'payment/';
constructor(private http: HttpClient) { }

CreateOrder(order: any){
  return this.http.post(this.baseURL, order);
}

}
