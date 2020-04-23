import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../_models/Product';

// const httpOptions = {
//   headers: new HttpHeaders({
//     Authorization: 'Admin' + localStorage.getItem('token')
//   })
// };

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]>{
    return this.http.get<Product[]>(this.baseUrl + 'products');
  }

  getProduct(idProduct): Observable<Product>{
    return this.http.get<Product>(this.baseUrl + 'products/' + idProduct);
  }
}


