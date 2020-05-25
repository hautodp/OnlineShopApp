import { Injectable } from '@angular/core';
import { Product } from '../_models/Product';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseUrl = environment.apiUrl;
  product: Product;
  id: number;

  products: Product[];
  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]>{
    return this.http.get<Product[]>(this.baseUrl + 'products/GetAll/');
  }

  getProduct(idProduct): Observable<Product>{
    this.id = idProduct;
    return this.http.get<Product>(this.baseUrl + 'products/' + idProduct);
  }

  updateProduct(id: number, product: Product){
    this.id = id;
    return this.http.put(this.baseUrl + 'products/' + id, product);
  }

  setMain(idProduct: number, id: number){
    return this.http.post(this.baseUrl + 'products/' + idProduct
      + '/photos/' + id + '/setMain', {});
  }

  deletePhoto(idProduct: number, id: number){
    return this.http.delete(this.baseUrl + 'products/' + idProduct
      + '/photos/' + id);
  }

  addProduct(data: Product){
    return this.http.post(this.baseUrl + 'products/add', data);
  }

  deleteProduct(id: number){
    return this.http.delete(this.baseUrl + 'products/' + id, {});
  }
  getAllProducts(): Observable<Product[]>{
    return this.http.get<Product[]>(this.baseUrl + 'products/GetAll/');
  }
}
