import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../_models/Product';
import { map } from 'rxjs/operators';
import { PaginatedResult } from '../_models/Pagination';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseUrl = environment.apiUrl;

  products: Product[];
  constructor(private http: HttpClient) { }

  // getProducts(): Observable<Product[]>{
  //   return this.http.get<Product[]>(this.baseUrl + 'products');
  // }

  getProducts(page?, itemsPerPage?): Observable<PaginatedResult<Product[]>>{
    const paginatedResult: PaginatedResult<Product[]> = new PaginatedResult<Product[]>();
    let params = new HttpParams();
    if (page != null && itemsPerPage != null){
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    return this.http.get<Product[]>(this.baseUrl + 'products', {observe: 'response', params})
    .pipe(
      map(response => {
        paginatedResult.result = response.body;
        if (response.headers.get('Pagination') != null){
          paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
        }
        return paginatedResult;
      })
    );
  }

  getProduct(idProduct): Observable<Product>{
    return this.http.get<Product>(this.baseUrl + 'products/' + idProduct);
  }
}


