import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
public nameSearch: string;
public int = 5;
constructor() {
  this.nameSearch = '';
}
getData(){
  return this.nameSearch;
}

setData(data){
  this.nameSearch = data;
}
}
