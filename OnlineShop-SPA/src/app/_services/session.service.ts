import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const sessionUrl = environment.apiUrl + 'session';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  constructor(private http: HttpClient) { }
  storeSessionData<T>(dataType: string, data: T) {
    console.log("test1");
    return this.http.post(`${sessionUrl}/${dataType}`, data)
      .subscribe(response => { });
  }

  getSessionData<T>(dataType: string): Observable<T> {
    console.log("test2");
    return this.http.get<T>(`${sessionUrl}/${dataType}`);
  }
}
