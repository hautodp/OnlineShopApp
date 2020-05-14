import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductSelection } from './Cart.model';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class Repository {
  constructor(private http: HttpClient){}
  private sendRequest<T>(verb: string, url: string, body?: ProductSelection)
  : Observable<T> {
    return this.http.request<T>(verb, url, {
    body: body
  });
  }
  storeSessionData(dataType: string, data: any) {
    return this.sendRequest('POST', 'http://localhost:5000/api/session/' + dataType, data)
    .subscribe(response => { });
  }

  getSessionData(dataType: string): Observable<any> {
    return this.sendRequest('GET', 'http://localhost:5000/api/session/' + dataType);
  }
}
