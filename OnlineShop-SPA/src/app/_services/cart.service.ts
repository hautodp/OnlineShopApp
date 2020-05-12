import { Injectable } from '@angular/core';
import { Product } from '../_models/Product';
import { Cart } from '../_models/Cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor(private cart: Cart) { }

  addToCart(product: Product){
    this.cart.addProduct(product);
  }

  get itemCount(): number{
    return this.cart.itemCount;
  }

  get totalPrice(): number{
    return this.cart.totalPrice;
  }
}
