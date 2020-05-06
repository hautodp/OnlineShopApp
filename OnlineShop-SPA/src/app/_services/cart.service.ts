import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Product } from '../_models/Product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  subject = new Subject();
  products: Product[];

  constructor() { }

  sendMsg(product: Product) {
    console.log(product);
    this.products.push(product);
  }

  getMsg() {
    return this.products;
  }
}
