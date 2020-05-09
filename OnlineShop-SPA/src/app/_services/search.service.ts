import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
private messageSoure = new BehaviorSubject('');
nameSearch = this.messageSoure.asObservable();
constructor() {
}
setData(message: string){
  this.messageSoure.next(message);
}
}
