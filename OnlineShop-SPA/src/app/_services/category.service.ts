import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private messageSoure = new BehaviorSubject(-1);
  idCateGory = this.messageSoure.asObservable();
  constructor() {
  }
  setData(message: number){
    this.messageSoure.next(message);
  }
}
